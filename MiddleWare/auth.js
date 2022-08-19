const jsonwt = require('jsonwebtoken')
const User = require("../model/user")


module.exports.auth = (req, res, next) => {
    const token = req.cookies
    if (token) {
        jsonwt.verify(token.jwt, "Yums already going fast.", (err, encoded) => {
            if (err) {
                res.redirect("/auth/login");
            } else {
                next()
            }
        })
    }
    else {
        res.redirect("/auth/login")
    }
}

module.exports.currentUser =  (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jsonwt.verify(token, "Yums already going fast.", async (err, decoded) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}