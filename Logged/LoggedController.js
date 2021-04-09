const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

// Internal modules
const Daily = require("../Database/DailyStats/DailySchema")
const Payment = require("../Database/Payments/PaymentsSchema")
const Stock = require("../Database/Stock/StockSchema")
const Store = require("../Database/Stores/StoresSchema")
const Order = require('../Database/Orders/Orders')
const Employee = require("../Database/Employees/EmployeeSchema")
const Company = require("../Database/Company/CompanySchema")

// Get
module.exports.Database = (req, res) => {
    let payload
    try{
        payload = jwt.verify(req.cookies.JWT, process.env.JWT)
        let LoggedUser = mongoose.createConnection(process.env.MongoPreFix + payload.id.id , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

        let model = '';

        if(req.body.Type === "Order"){
            model = LoggedUser.model(req.body.Type, Order)
                model.find({Done: req.body.Done}).then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Daily"){
            model = LoggedUser.model(req.body.Type, Daily)
                model.find().then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Payment"){
            model = LoggedUser.model(req.body.Type, Payment)
                model.find({Done: req.body.Done}).then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Stock"){
            model = LoggedUser.model(req.body.Type, Stock)
                model.find().then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Store"){
            model = LoggedUser.model(req.body.Type, Store)
                model.find().then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Employee"){
            model = LoggedUser.model(req.body.Type, Employee)
                model.find().then(data => {
                    res.send(data)
                })
        } else if(req.body.Type === "Company"){
            model = LoggedUser.model(req.body.Type, Company)
                model.find().then(data => {
                    res.send(data)
                })
        } else {
            res.send("No data")
        }

        // model.find({Done: req.body.Done}).then(data => {
        //     res.send(data)
        // })
        // res.send({ Type: 1, Group: payload.id.group})
    }
    catch (e) {
        res.send(e)
    }
}

// Add
module.exports.Insert = (req, res) => {
    let payload
    try{
        payload = jwt.verify(req.cookies.JWT, process.env.JWT)
        let LoggedUser = mongoose.createConnection(process.env.MongoPreFix + payload.id.id , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

        let model = '';

        if(req.body.Type === "Order"){
            model = LoggedUser.model(req.body.Type, Order)

            let newModel = new model({Amount: req.body.Amount, Code: req.body.Code, Date: req.body.Date, Done: false, Store: req.body.Store, AddedBy: payload.id.id })
            newModel.save(function (err, response) {
                if (err) {
                    console.log("Errors: " +  err)
                    res.send({Error: err})
                } else {
                    console.log("Response: " + response)
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Daily"){
            model = LoggedUser.model(req.body.Type, Daily)

            let newModel = new model({Store: req.body.Store, Sold: req.body.Sold, Date: req.body.Date, Summary: req.body.Summary})
            newModel.save(function (err, response) {
                if (err) {
                    console.log("Errors: " +  err)
                    res.send({Error: err})
                } else {
                    console.log("Response: " + response)
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Payment"){
            model = LoggedUser.model(req.body.Type, Payment)

            let newModel = new model({Name: req.body.Name, Amount: req.body.Amount, Date: req.body.Date, Done: false, Store: req.body.Store, AddedBy: payload.id.id })
            newModel.save(function (err, response) {
                if (err) {
                    console.log("Errors: " +  err)
                    res.send({Error: err})
                } else {
                    console.log("Response: " + response)
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Stock"){
            model = LoggedUser.model(req.body.Type, Stock)

            let newModel = new model({Name: req.body.Name, Amount: req.body.Amount, Category: req.body.Category, IsAvailable: req.body.IsAvailable})
            newModel.save(function (err, response) {
                if (err) {
                    console.log("Errors: " +  err)
                    res.send({Error: err})
                } else {
                    console.log("Response: " + response)
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Store"){
            model = LoggedUser.model(req.body.Type, Store)

            let newModel = new model({Street: req.body.Street, BuildingNumber: req.body.BuildingNumber, City: req.body.City, Employees: req.body.Employees, Stock: req.body.Stock,  })
            newModel.save(function (err, response) {
                if (err) {
                    res.send({Error: err})
                } else {
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Employee"){
            model = LoggedUser.model(req.body.Type, Employee)

            let newModel = new model({Name: req.body.Name, Email: req.body.Email, Store: req.body.Store })
            newModel.save(function (err, response) {
                if (err) {
                    res.send({Error: err})
                } else {
                    res.send({Type: "success"})
                }
            });
        } else if(req.body.Type === "Company"){
            model = LoggedUser.model(req.body.Type, Company)

            let newModel = new model({Name: req.body.Name, City: req.body.City, Street: req.body.Street, Number: req.body.Number, Postcode: req.body.Postcode })
            newModel.save(function (err, response) {
                if (err) {
                    res.send({Error: err})
                } else {
                    res.send({Type: "success"})
                }
            });
        } else {
            res.send("No data")
        }

        // model.find({Done: req.body.Done}).then(data => {
        //     res.send(data)
        // })
        // res.send({ Type: 1, Group: payload.id.group})
    }
    catch (e) {
        res.send(e)
    }
}
