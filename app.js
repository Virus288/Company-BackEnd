const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { getData } = require("./GetData");
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
require('dotenv').config()

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
    getData(req.query.category, req.query.id).then(data => res.send(data))
})

app.get('*', function(req, res){
    res.status(404).send('Seems like page you are trying to find, does not exist');
});