const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const {EditEmployyes} = require("./EditEmployyes");
const {GetStoreStock} = require("./StoreStock");
const {AddEmploye} = require("./AddEmploye");
const {getStores} = require("./GetStores");
const {AddStock} = require("./UpdateStock");
const {Updateorders} = require("./UpdateOrders");
const { getData } = require("./GetData");
const { getOrders } = require("./GetOrders")
const { getStock } = require("./GetStock")
const { AddOrders } = require('./AddOrders')
const { checkUser, requireAuth, CheckIfLogged } = require("./middleware/authMiddleware");
const { getEmployyes } = require("./GetEmployyes");
require('dotenv').config();

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

// routes
app.get('*', checkUser);

app.get('/', (req, res) => res.render('home'));

app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.get("/location", function(req, res){
    res.send(req.ip);
    console.log(req.ip);
});

app.get('/store', (req,res) => {
    getData(req.query.category, req.query.id)
        .then(data => res.send(data))
});

app.get('/orders', (req,res) => {
    getOrders(req.query)
        .then(data => res.send(data))
});

app.post('/orders', (req,res) => {
    Updateorders(req.body.Done, req.body.id)
        .then(data => res.send(data))
});

app.get('/stock', (req,res) => {
    getStock()
        .then(data => res.send(data))
});

app.get('/employyes', (req,res) => {
    getEmployyes(req.query.employee)
        .then(data => res.send(data))
});

app.post('/editemployyes', (req,res) => {
    EditEmployyes(req.body)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
});

app.post('/addemployyes', (req,res) => {
    AddEmploye(req.body)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
});

app.get('/stores', (req,res) => {
    getStores(req.query.store)
        .then(data => res.send(data))
});

app.get('/salesstats', (req,res) => {
    getStores(req.query.store)
        .then(data => res.send(data))
});

app.post('/addstock', (req,res) => {
    AddStock(req.body.itemid, req.body.stock)
        .then(data => res.send({message: data, type: "success"}))
        .catch((err) => res.send({message: err, type: "error"}));
    //
});

app.post('/addorder', (req,res) => {
    AddOrders(req.body.itemid, req.body.store, req.body.user)
        .then(data => res.send({data}))
});

app.get('*', function(req, res){
    res.status(404).send('Seems like page you are trying to find, does not exist');
});