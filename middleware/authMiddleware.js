const jwt = require("jsonwebtoken");
require("dotenv").config()

verify = (req, res, next) => {
    let accessToken = req.cookies.JWT

    if (!accessToken){
        return res.status(200).send({message: "Token invalid", Type: 0})
    }

    let payload
    try{
        // Trying to save payload will automatically reject
        payload = jwt.verify(accessToken, process.env.JWT)
        // console.log(payload)
        next()
    }
    catch(e){
        return res.status(401).send(e)
    }
}

module.exports = { verify }
