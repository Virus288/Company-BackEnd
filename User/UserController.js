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
        console.log(data)
        // Zaczni wysyłać info "type 0" przy erroże
        if (data.data.Type === 1) {
            let token = createToken(data.name);
            res.cookie("JWT", token, {httpOnly: true, maxAge: maxAge * 1000});
            res.send(data.data)
        } else {
            res.send(data)
        }
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("JWT", "Logout", {httpOnly: true, maxAge: 0});
    res.send("LoggedOut")
}

// Token
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT, {
        expiresIn: maxAge
    })
}
