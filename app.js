// External modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const fs = require('fs');
require('dotenv').config();

// Internal modules
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const {getData} = require("./Database/GetData");
const {UpdateDone} = require("./Database/UpdateDone");
const {updateData} = require("./Database/UpdateData");
const {addData} = require("./Database/AddData");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Addons
app.use(authRoutes);

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MongoUrl;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .then((result) => console.log("App is listening on port 5000"))
  .catch((err) => console.log(err));


app.get('/', (req, res) => res.send("Seems like that page isn't available at this moment."));

app.get("/location", function(req, res){
    res.send(req.ip);
    console.log(req.ip);
});

app.get("/getData", function(req, res){
    getData(req.query).then(data => res.send(data))
});

app.post("/addData", function(req, res){
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

app.get('/salesstats', (req,res) => {
    let data = `./SalesStats/${req.query.store}`
    let files = [];

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
                res.send(JSON.stringify(files))
            } else {
                res.send({Message: "No data"})
            }
        }
    }
});



app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error with your data. Make sure that you are sending right type of data');
});