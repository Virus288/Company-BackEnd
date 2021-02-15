// External modules
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const fs = require('fs');
require('dotenv').config();

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

// Internal modules
const {getData} = require("./Database/GetData");
const {UpdateDone} = require("./Database/UpdateDone");
const {updateData} = require("./Database/UpdateData");
const {addData} = require("./Database/AddData");
const AuthRoutes = require("./User/LoginRoutes.js");
const { verify } = require("./User/UserController")

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(AuthRoutes);

app.listen(5000, () => console.log("App is listening on port 5000"));

app.get('/', (req, res) => res.send("Seems like that page isn't available at this moment."));

app.get("/location", function(req, res){
    res.send(req.ip);
    console.log(req.ip);
});

app.get("/token", verify, function(req, res){
    res.send("Verified")
});

app.get("/getData", function(req, res){
    getData(req.query).then(data => res.send(data))
});

app.post("/addData", function(req, res){
    if(req.body.City !== undefined){
        let data = `./SalesStats/${req.body.City}`

        if(!fs.existsSync(data)){
            fs.mkdirSync(data, { recursive: true })
        }

    }
    addData(req.body)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
});

app.post("/updateData", function(req, res){
    updateData(req.body)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
});

app.post('/UpdateDone', (req,res) => {
    UpdateDone(req.body)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
});

app.post("/adday", (req,res) => {
    console.log(req.body)
    let path = `SalesStats/${req.body.City}/${req.body.day}`

    if(!fs.existsSync(path + ".json")){
        let Data = {}
        Data.day = req.body.day;
        Data.profit = req.body.profit;
        Data.sold = req.body.data;
        let strData = JSON.stringify(Data)

        try {
            fs.writeFileSync(path + ".json", strData)
        } catch (err) {
            res.send({message: err, type: "error"})
        }
        res.send({message: "Success", type: "success"})
        console.log("Success sanded")
    } else {
        res.send({message: "Seems like data you are trying to insert already exists", type: "error"})
    }

});

app.get('/salesstats', (req,res) => {
    let data = `./SalesStats/${req.query.store}`
    let files = [];
    let profits = [];

    if(!req.query.store){
        res.send("Sory but it seems like you didnt pass any store to get data from")
    } else {
        if(req.query.day){
            data += `/${req.query.day}.json`
            let file = require(data)
            res.send(JSON.stringify(file))
        } else {
            let Readdir = fs.readdirSync(data)
            if(Readdir.length !== 0){
                Readdir.forEach(file => {
                    files.push(file)
                });
            files.forEach(file => {
                let data2 = require(data + "/" + file)
                profits.push(data2["profit"])
            })
            res.send(JSON.stringify({
                files,
                profits
            }))
            } else {
                res.send({Message: "No data"})
            }
        }
    }
});

app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error. Try again later');
});
