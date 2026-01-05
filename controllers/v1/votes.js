const mongoose = require('mongoose');

const Vote = require('../../models/v1/Vote');

const getAll = (req, res) =>{
    let filter = {};
    if (req.query.user) {
        filter.user = new mongoose.Types.ObjectId(req.query.user);
    }

    if (req.query.bag) {
        filter.bag = new mongoose.Types.ObjectId(req.query.bag);
    }
    Vote.find(filter)
    .then(votes => {
        res.json({
            "status": "success",
            "message": req.query.user ? `GETTING votes for user ${req.query.user}` : req.query.bag ? `GETTING votes for bag ${req.query.bag}` : "GETTING votes",
            "data": {
                "votes": votes
            }
        });
    })
    .catch(err => res.status(500).json({
        "status": "error",
        "message": err.message,
    }))
}

const getById = (req, res) => {
    let id = req.params.id;
    Vote.findById(id)
    .then(vote => {
        if (!vote) {
            return res.status(404).json({ message: 'Vote not found' });
        }
        res.json({
            "status": "success",
            "message": "GETTING vote "+id,
            "data": {
                "vote": vote
            }
        });
    })
    .catch(err => res.status(500).send({
        "status": "error",
        "message": err.message,
    }));
}

const create = (req, res) => {
    const vote = new Vote();
    vote.user = req.body.user;
    vote.bag = req.body.bag;

    vote.save()
    .then(savedVote => {
        res.status(201).json({
            "status": "success",
            "message": "Vote created successfully",
            "data": {
                "vote": savedVote
            }
        });
    })
    .catch(err => res.status(500).json({
        "status": "error",
        "message": err.message,
    }));
};

module.exports = {
    getAll,
    create,
    getById,
};