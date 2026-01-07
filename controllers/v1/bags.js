const Bag = require('../../models/v1/Bag');
const streamifier = require('streamifier');
const cloudinary = require('../../cloudinary');

const getAll = (req, res) =>{
    Bag.find()
    .then(bags => res.json({
        "status": "success",
        "message": "GETTING all bags",
        "data": {
            "bags": bags
        }
    }))
    .catch(err => res.status(500).json({
        "status": "error",
        "message": err.message,
    }))
}

const getById = (req, res) => {
    let id = req.params.id;
    Bag.findById(id)
    .then(bag => {
        if (!bag) {
            return res.status(404).json({ message: 'Bag not found' });
        }
        res.json({
            "status": "success",
            "message": "GETTING bag "+id,
            "data": {
                "bag": bag
            }
        });
    })
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
}

const create = async (req, res) => {
    const { name, font, color, keyFlavours, user } = req.body;
    const flavoursArray = JSON.parse(keyFlavours); // keyFlavours komt als JSON-string
    //const user = req.user.id;
    let imageUrl = "placeholder.png";
    if (req.file) {
      // upload image naar Cloudinary
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "bags" },
            (error, result) => {
                console.error("Cloudinary error:", error);
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }

    const bag = new Bag();
    bag.name = req.body.name;
    bag.image = imageUrl;
    bag.color = req.body.color;
    bag.font = req.body.font;
    bag.keyFlavours = flavoursArray;
    bag.user = req.body.user;

    bag.save()
        .then(msg => res.status(201).send({
        "status": "success",
        "message": "Bag created",
        "data": {
            "bag": bag
        }
    }))
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
}

const update = (req, res) => {
    let id = req.body.id;
    Bag.findByIdAndUpdate(id, req.body, { new: true })
    .then(bag => {
        if (!bag) {
            return res.status(404).json({ message: 'Bag not found' });
        }
        res.json({
            "status": "success",
            "message": "Bag updated",
            "data": {
                "bag": bag
            }
        });
    })
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
}

const destroy = (req, res) => {
    let id = req.params.id;
    Bag.findByIdAndDelete(id)
    .then(bag => {
        if (!bag) {
            return res.status(404).json({ message: 'Bag not found' });
        }
        res.json({
            "status": "success",
            "message": "Bag deleted",
            "data": {
                "bag": bag
            }
        });
    })
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy
};