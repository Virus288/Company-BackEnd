const {con} = require("../Database/DBConnect");
const validator = require("validator");
const passwordValidator = require('password-validator');
const bcrypt = require("bcrypt");

class User {
    constructor(email, password, username, password2){
        // Set up properties
        this.username = username;
        this.email = email;
        this.password = password;
        this.password2 = password2;
        this.errors = {};
    }

    async ValRegister() {
        let info;
        let name;

        await this.CheckUser().then(data => {
            info = data;
        })

        await this.CheckUserName().then(data => {
            name = data
        })

        this.ValUsername(name);
        this.CheckEmail(info);
        this.ValEmail();
        this.ValPass();

        if (Object.keys(this.errors).length === 0) {
            await this.register()
            return {Type: 1, Message: "Success"}
        } else {
            return this.errors
        }
    }

    async ValLogin() {
        let info;
        await this.CheckUser().then(data => {
            info = data;
        })
        if(info.length > 0){
            this.ValEmail();
            this.CheckIfEmailExists(info[0].email);
            if (Object.keys(this.errors).length !== 0) {
                return this.errors
            } else {
                return await this.login(info[0].password).then(data => {
                    return {data: data, name: info[0].name}
                })
            }
        } else {
            this.addError("email", "Email invalid")
            return this.errors
        }
    }

    // CheckUser
    ValUsername(name){
        if(name.length === 1){
            if(name[0].name.length <= 4){
                this.addError("username", "Username length should be at least 4 characters")
            } else {
                if(name[0].name.length > 0){
                    this.addError("username", "Username already registered")
                }
            }
        }
    }

    CheckIfEmailExists(email) {
        if (email.length === 0) {
            this.addError("email", "Email invalid")
        }
    }

    ValEmail(){
        if(!validator.isEmail(this.email)){
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


    async login(password) {
        const auth = await bcrypt.compare(this.password, password)
        if (auth) {
            console.log("Success")
            return {Type: 1, Message: "Success", Login: "Success"}
        } else {
            this.addError("password", "Password invalid")
            return this.errors
        }
    }

    CheckEmail = (email) => {
        if(email.length === 1){
            if(email[0].email.length <= 4){
                this.addError("email", "Email invalid")
            } else {
                if(email[0].email.length > 0){
                    this.addError("email", "Email invalid")
                }
            }
        }
    }

    CheckUserName = async () => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT name FROM usrs WHERE name = '${this.username}'`, (err, results) => {
                if (err){
                    return reject(err.sqlMessage);
                }else{
                    resolve(results);
                }
            });
        })
    }

    CheckUser = async () => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT name, password, email FROM usrs WHERE email = '${this.email}'`, (err, results) => {
                if (err){
                    return reject(err.sqlMessage);
                }else{
                    resolve(results);
                }
            });
        })
    }

    register = async () => {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)

        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO usrs VALUES (NULL, '${this.username}', '${this.password}', '${this.email}')`, (err, results) => {
                if (err){
                    return reject(err.sqlMessage);
                }else{
                    resolve(results);
                }
            });
        })
    }

}

module.exports = {
    User
}
