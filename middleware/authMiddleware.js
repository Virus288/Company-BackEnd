const jwt = require("jsonwebtoken");
require("dotenv").config()

verify = (req, res, next) => {
    let accessToken = req.cookies.JWT

    // Jeśli wygasa, jest No authorisation
    if (!accessToken){
        return res.status(403).send({message: "Token invalid", type: 1})
    }

    let payload
    try{
        // Zbadaj token
        payload = jwt.verify(accessToken, process.env.JWT)
        next()
    }
    catch(e){
        // Wywal błąd jeśli nastąpi
        return res.status(401).send(e)
    }
}

module.exports = { verify }
