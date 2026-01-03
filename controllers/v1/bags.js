const Bag = require('../../models/v1/Bag');

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

const create = (req, res) => {
    const bag = new Bag();
    bag.name = req.body.name;
    bag.image = req.body.image;
    bag.color = req.body.color;
    bag.font = req.body.font;
    bag.keyFlavours = req.body.keyFlavours;
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

module.exports = {
    getAll,
    getById,
    create,
    update
};