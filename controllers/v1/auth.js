const User = require('../../models/v1/User');
const passport = require('../../passport/passport');

const signup = async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    const newUser = new User({ firstName: firstName, lastName: lastName, email: email });
    await newUser.setPassword(password);
    await newUser.save()
    .then(user => res.status(201).json({
        "status": "success",
        "message": "User signed up",
    }))
    .catch(err => res.status(500).json({
        "status": "error",
        "message": err.message,
    }));
}

const login = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            User.authenticate()(req.body.email, req.body.password, (err, user) => {
                if (err) reject(err);
                else resolve(user);
            });
        });

        if (!result) {
            return res.status(401).json({
                "status": "error",
                "message": "Authentication failed",
            });
        }

        return res.json({
            "status": "success",
            "message": "User logged in",
        });
    } catch (err) {
        return res.status(500).json({
            "status": "error",
            "message": err.message,
        });
    }
}

module.exports = {
    signup,
    login
}