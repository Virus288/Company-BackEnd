const jwt = require("jsonwebtoken")
const {User} = require("./User");
const UserSchema = require("./UserSchema")

// Register
module.exports.register = (req, res) => {
    let Data = new User(req.body.username, req.body.email, req.body.password, req.body.password2);

    Data.ValRegister().then(data => {
        res.send(data)
    })
}

// Login
module.exports.login = async (req, res) => {
    let Data = new User("undefined", req.body.email, req.body.password);

    Data.ValLogin().then(data => {
        if(!data.Type){
            res.send(data)
        } else {
            let token = createToken({id: data.Id, group: data.Group});
            res.cookie("JWT", token, {httpOnly: true, maxAge: maxAge * 1000});
            res.send({Type: data.Type, Message: data.Message, FirstOpen: data.FirstOpen})
        }
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("JWT", "Logout", {httpOnly: true, maxAge: 0});
    res.send({Type: 1, Message: "Success"})
}

module.exports.update = async (req, res) => {
    await UserSchema.findOneAndUpdate({email: req.body.email}, {FirstOpen: req.body.FirstOpen}, (err, data) => {
        if (err) {
            console.log(err);
        }
        // console.log(data);
    });
}

// Token
const maxAge = 30 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT, {
        expiresIn: maxAge
    })
}
