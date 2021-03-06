const validator = require("validator");
const passwordValidator = require('password-validator');
const UserSchema = require("./UserSchema")
const bcrypt = require("bcrypt");
const Cryptr = require('cryptr');

class User {
    constructor(username, email, password, password2){
        // Set up properties
        this.username = username;
        this.email = email;
        this.password = password;
        this.password2 = password2;
        this.errors = {};
    }

    async ValRegister() {

        await this.CheckUser(this.email)
            .then(data => {
                if(data.length > 0){
                    this.addError("email", "Email already registered")
                }
            })
        if(Object.keys(this.errors).length > 0){
            return (this.errors)
        } else {
            await this.ValEmail();
            await this.ValUsername();
            await this.ValPass();

            if (Object.keys(this.errors).length === 0) {
                await this.register()

                if(Object.keys(this.errors).length > 0){
                    return (this.errors)
                } else {
                    return {Type: 1, Message: "Success"}
                }

            } else {
                return this.errors
            }

        }
    }

    async ValLogin() {
        await this.ValEmail();
        if(this.errors > 0){
            this.addError("email", "Email invalid")
            return this.errors
        } else {
            return await this.CheckUser(this.email)
                .then(async (data) => {
                    if(data.length > 0){
                        console.log()
                        return await this.login(data[0].password)
                    } else {
                        this.addError("email", "Email not registered")
                        return this.errors
                    }
                })

        }
    }

    // Check name
    ValUsername(){
        if(this.username.length <= 4){
            this.addError("username", "Username length should be at least 4 characters long")
        }
    }

    ValEmail(){
        if(!validator.isEmail(this.email)){
            console.log(this.email)
            this.addError("email", "Email invalid")
        }
    }

    ValPass(){
        if(this.password !== this.password2){
            this.addError("password", "Password invalid")
        } else {
            let schema = new passwordValidator();

            schema
                .is().min(6)
                .is().max(100)
                .has().uppercase()
                .has().lowercase()
                .has().digits(1)
                .has().not().spaces();

            if(!schema.validate(this.password)){
                this.addError("password", "Password invalid")
            }
        }
    }

    addError(key, val){
        this.errors[key] = val;
    }

    CheckUser = async (email) => await UserSchema.find({email: email}, function (err, user) {
        if(err){
            console.error(err)
        }
        return user
    })

    async login(password) {
        const auth = await bcrypt.compare(this.password, password)
        if (auth) {
            console.log("Success")
            return {Type: 1, Message: "Success"}
        } else {
            this.addError("password", "Password invalid")
            return this.errors
        }
    }

    register = async () => {
        const EncryptedKey = new Cryptr('Le9~M8>Pn-)zLma,=wP-2pT?UYK7;[.ZKgya');
        const encryptedString = EncryptedKey.encrypt(this.email);

        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)

        let NewUser = new UserSchema({ name: this.username, email: this.email, password: this.password, role: "admin", group: encryptedString,  employees: [] });

        await NewUser.save()
            .catch(err => {
                this.addError("email", err._message)
            })
    }

}

module.exports = {
    User
}
