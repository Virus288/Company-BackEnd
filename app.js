// External modules
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');
const mongoose = require("mongoose")
const schema = require("./GraphQLSchema/schema")
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const key = fs.readFileSync("./.cert/key.pem")
const cert = fs.readFileSync("./.cert/cert.pem")

// Internal modules
const AuthRoutes = require("./User/LoginRoutes.js");
const LoggedRoutes = require('./Logged/LoggedRoutes')
const { verify } = require("./middleware/authMiddleware")

const app = express();
console.log("App started. Pls wait for mongoDB to connect")

mongoose.connect(process.env.MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(() => {
        // Listen on https
        //
        // const httpsServer = https.createServer({ key, cert }, app);
        // httpsServer.listen(5000, () => {
        //     console.log('Connected to mongo. Listening on 5000');
        // });
        // Listen on http
        //
        const httpServer = http.createServer(app);
        httpServer.listen(5000, () => {
            console.log('Connected to mongo. Listening on 5000');
        });

    })
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

// Additional routes for security
app.use(AuthRoutes);
app.use(verify)
app.use(LoggedRoutes)

// Verification api for token validation in front
app.get('/token', (req, res) => {
        let payload
        try{
            payload = jwt.verify(req.cookies.JWT, process.env.JWT)
            res.send({ Type: 1})
        }
        catch (e) {
            res.send(e)
        }
})

// Graph
app.use('/graphql', graphqlHTTP({
    schema: schema
}));

app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error. Try again later');
});
