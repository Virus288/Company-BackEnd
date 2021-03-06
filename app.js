// External modules
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose")
const cors = require("cors");
const fs = require('fs');
require('dotenv').config();

// Internal modules
const AuthRoutes = require("./User/LoginRoutes.js");
const { verify } = require("./middleware/authMiddleware")

const app = express();
console.log("App started. Pls wait for mongoDB to connect")

mongoose.connect(process.env.MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(() => app.listen(5000, () => console.log("Connected to mongo. Listening on 5000")))
    .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
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
app.use(verify)

app.get("/getData", function(req, res){
    getData(req.query).then(data => res.send(data))
});

app.post("/addData", function(req, res){
});

app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error. Try again later');
});
