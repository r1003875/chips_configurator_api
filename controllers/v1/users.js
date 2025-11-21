const User = require('../../models/v1/User');

const getAll = (req, res)=>{
    User.find()
    .then(users => res.json({
        "status": "success",
        "message": "GETTING all users",
        "data": {
            "users": users
        }
    }))
    .catch(err => res.status(500).json({
        "status": "error",
        "message": err.message,
    }))
}

const getById = (req, res) => {
    let id = req.params.id;
    User.findById(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            "status": "success",
            "message": "GETTING user "+id,
            "data": {
                "user": user
            }
        });
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

const create = (req, res) => {
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
    .then(msg => res.status(201).send({
        "status": "success",
        "message": "User created",
        "data": {
            "user": user
        }
    }))
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
}

module.exports = {
    getAll,
    getById,
    create,
};