const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config()

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.SecretKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SecretKey, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

const CheckIfLogged = (req, res) => {
    const token = req.body.token;
    console.log(token)

    if (token) {
        jwt.verify(token, process.env.SecretKey, (err, decodedToken) => {
            if (err) {
                res.send({"verified": false})
                console.log("Not veryfied")
            } else {
                res.send({"verified": true})
                console.log("Veryfied")
            }
        });
    } else {
        res.send({"verified": false})
        console.log("Not veryfied")
    }
};

module.exports = {
    requireAuth,
    checkUser,
    CheckIfLogged
}