// External modules
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose")
const schema = require("./GraphQLSchema/schema")
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
require('dotenv').config();
const jwt = require("jsonwebtoken");

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

// Additional routes for security
app.use(AuthRoutes);
app.use(verify)

app.post('/LoggedUser', (req, res) => {
    let payload
    try{
        payload = jwt.verify(req.cookies.JWT, process.env.JWT)
        let LoggedUser = mongoose.createConnection(process.env.MongoPreFix + payload.id.id , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

        const OrderModel = LoggedUser.model('Order', new mongoose.Schema({
            Amount : {
                type: Number,
                required: [true]
            },
            Code : {
                type: Number,
                required: [true]
            },
            Date : {
                type: Object,
                required: [true]
            },
            Done : {
                type: Boolean,
                required: [true],
                default: false
            },
            Store: {
                type: Number,
                required: [true]
            },
            AddedBy: {
                type: String,
                required: [true]
            },
            group: {
                type: String,
                required: true
            }
        }, { collection: 'Order' }));

        OrderModel.find().then(data => {
            console.log(data)
            res.send(data)
        })

        // res.send({ Type: 1, Group: payload.id.group})
    }
    catch (e) {
        res.send(e)
    }
})

// Verification api for token validation in front
app.get('/token', (req, res) => {
        let payload
        try{
            payload = jwt.verify(req.cookies.JWT, process.env.JWT)
            res.send({ Type: 1, Group: payload.id.group})
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
