const {con} = require("./DBConnect")

const getData = async (data) => {
    console.log(data)
    let PredefinedData = [
        // Files
        // Daily stats
        'salesstats?store',
        // Sales stats daily data
        'salesstats?store',
        ]

    // Error handler
    const ErrorHandler = (errno) => {
        if(errno.errno === 1054){
            return (`Seems like you are trying to access data by sending wrong type of data. Error code: ${err.errno}`);
        }
        return(`Seems like we have an unknown error.`)
    }

    // Get request from database
    const GetReq = async (category, data, dataType) => {
        if(data === "all"){
            return new Promise((resolve, reject) => {
                con.query(`SELECT * FROM ${category}`, (err, results) => {
                    if (err){
                        return reject(err.sqlMessage);
                    }else{
                        resolve(results);
                    }
                });
            }).catch((err) => ErrorHandler(err));
        } else {
            return new Promise((resolve, reject) => {
                con.query(`SELECT * FROM ${category} WHERE ${dataType} = '${data}'`, (err, results) => {
                    if (err){
                        return reject(err.sqlMessage);
                    }else{
                        resolve(results);
                    }
                });
            }).catch((err) => ErrorHandler(err));
        }
    }

    // Check what kind of data user want
    if(data.employees){
        // Employees
        let Data;
        await GetReq("employees", data.employees, "id").then(data => Data=data);
        return Data
    } else if(data.stock){
        // Stock
        let Data;
        await GetReq("stock", data.stock, "No data").then(data => Data=data);
        return Data
    } else if(data.orders){
        // Orders
        let Data;
        await GetReq("orders", data.orders, "IsDone").then(data => Data=data);
        return Data
    } else if(data.getpayments){
        // Payments
        let Data;
        await GetReq("payments", data.getpayments, "IsDone").then(data => Data=data);
        return Data
    } else if(data.store) {
        // Stock from stores
        let Data;
        await GetReq("StoresStock", data.store, "store").then(data => Data=data);
        return Data
    } else if(data.stores){
        // Stores
        let Data;
        await GetReq("stores", data.stores, "stores").then(data => Data=data);
        return Data
    } else {
        return ("Seems like there you didnt specify what kind of data you want to fetch")
    }
}

module.exports = {
    getData
}