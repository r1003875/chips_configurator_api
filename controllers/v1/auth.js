const User = require('../../models/v1/User');
const passport = require('../../passport/passport');
const jwt = require('jsonwebtoken');
/*
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
*/
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({ firstName, lastName, email });
    await newUser.setPassword(password);
    await newUser.save();

    // 🔐 JWT maken
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin || false
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🎯 Terugsturen naar frontend
    res.status(201).json({
      status: "success",
      message: "User signed up",
      token,
      userId: newUser._id
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      User.authenticate()(req.body.email, req.body.password, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed",
      });
    }

    // 🔐 JWT maken
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      status: "success",
      message: "User logged in",
      token,          // 🔥 belangrijk
      userId: user._id,
      isAdmin: user.isAdmin
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
/*
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
            "isAdmin": result.isAdmin,
            "userId": result._id,
        });
    } catch (err) {
        return res.status(500).json({
            "status": "error",
            "message": err.message,
        });
    }
}
*/
module.exports = {
    signup,
    login
}