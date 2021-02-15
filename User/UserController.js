const jwt = require("jsonwebtoken")
const {User} = require("./User");

// Register
module.exports.register = (req, res) => {
    let Data = new User(req.body.email, req.body.password, req.body.name, req.body.password2);

    Data.ValRegister().then(data => {
        res.send(data)
    })
}

// Login
module.exports.login = async (req, res) => {
    let Data = new User(req.body.email, req.body.password);

    await Data.ValLogin().then(data => {
        if (data.data.Type === 1) {
            let token = createToken(data.name);
            res.cookie("JWT", token, {httpOnly: true, maxAge: maxAge * 1000});
        }
        res.send(data.data)
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("JWT", "Logout", {httpOnly: true, maxAge: 0});
    res.send("LoggedOut")
}

// Token
const maxAge = 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT, {
        expiresIn: maxAge
    })
}

module.exports.verify = (req, res, next) => {
    let accessToken = req.cookies.JWT

    if (!accessToken){
        return res.status(403).send("No authorisation")
    }

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.JWT)
        console.log(payload)
        next()
    }
    catch(e){
        return res.status(401).send(e)
    }
}
