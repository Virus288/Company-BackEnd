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
            res.send({Type: data.Type, Message: data.Message, Group: data.Group})
        }
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("JWT", "Logout", {httpOnly: true, maxAge: 0});
    res.send({Type: 1, Message: "Success"})
}

module.exports.update = async (req, res) => {
    let newValues = {}
    let type = req.body.type
    newValues[type] = req.body.name
    await UserSchema.findOneAndUpdate({email: req.body.email}, newValues, {new: true}, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });
}

// Token
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT, {
        expiresIn: maxAge
    })
}
