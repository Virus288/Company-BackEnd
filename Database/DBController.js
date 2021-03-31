// File left for debbuging and hard adding stuff


const mongoose = require("mongoose")

// Imports
const Daily = require("./DailyStats/DailySchema")
const Order = require("./Orders/Orders")
const Payment = require("./Payments/PaymentsSchema")
const Stock = require("./Stock/StockSchema")
const Store = require("./Stores/StoresSchema")

// Get data from server
module.exports.GetData = async (req, res) => {

    // let model = mongoose.model(req.query.type, req.query.type)
    //
    // // Daily sample
    // await model.find({"Date.month": 3}, function (err, data) {
    //     if(err){
    //         console.error(err)
    //     }
    //     res.send(data)
    // })
}

// Post data to server
module.exports.PostData = async (req, res) => {
    // Order
    // const Orders = new Order({amount: 111, Code: 265, Date: {day: 6, month: 3, year: 2021}, Done: false, Store: "12312321", AddedBy: "132321asd"})
    // await Orders.save()
    //     .then(data => res.send(data))
    //     .catch(err => console.log(err))

    // Payments
    // const Payments = new Payment({name: "Opłata za prąd 02.21", amount: 921, Date: {day: 6, month: 3, year: 2021}, Done: false, Store: "12312321", AddedBy: "132321asd"})
    // await Payments.save()
    //     .then(data => res.send(data))
    //     .catch(err => console.log(err))

    // Stock
    // const StockValue = new Stock({name: "Pościel", amount: 921, Category: "posciel", IsAvailable: true})
    // await StockValue.save()
    //     .then(data => res.send(data))
    //     .catch(err => console.log(err))

    // Stores
    // const Stores = new Store({Street: "Warszawska", BuildingNumber: 1, City: "Rawicz", Employees: {1: "213213", 2: "21321312"}, Stock: {1: "1111", 2: "2222"}})
    // await Stores.save()
    //     .then(data => res.send(data))
    //     .catch(err => console.log(err))

    // Daily
    // const DailyStats = new Daily({Store: 213213, Sold: {Code: {1: 111, 2: 222, 3: 333, 4: 444, 5: 555, 6: 666}, Amount: {1: 11, 2: 22, 3: 33, 4: 44, 5: 55, 6: 66}}, Date: {day: 6, month: 3, year: 2021}, Summary: 1121})
    // await DailyStats.save()
    //     .then(data => res.send(data))
    //     .catch(err => console.log(err))

    // Update
    // await Stores.findOneAndUpdate({_id: "6043b6c93c509a24b3cc55b4"}, {Employees: {name: "YourDad"}}, {new: true}, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(data);
    // });
}
