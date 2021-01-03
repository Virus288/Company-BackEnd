const {con} = require("./DBConnect")

const addData = async (data) => {
    console.log(data)

    // Error handler
    const ErrorHandler = (err) => {
        console.log(err.errno)
        if(err.errno == "1062"){
            return(`Item that you are trying to register, already exists in database. If you are trying to edit that item, go to "edit items in stock"`)
        } else {
            return(`Seems like we have an error. Developer information ${err.errno}`)
        }
    }

    // Get request from database
    const AddReq = async (category, data) => {
        let values = "null, ";
        if(category === "stock"){
            values = "";
        }
        for(let i = 0; i < Object.keys(data).length; i++){
            if(Object.keys(data)[i] !== "Category"){
                if(Object.keys(data)[i] === "Timestamp" || Object.keys(data)[i] === "IsDone"){
                    values += `${data[Object.keys(data)[i]]}, `
                } else {
                    if((i + 1) === Object.keys(data).length){
                        values += `'${data[Object.keys(data)[i]]}'`
                    } else {
                        values += `'${data[Object.keys(data)[i]]}', `
                    }
                }
            }
        }
        console.log(`INSERT INTO ${category} VALUES (${values})`)

        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO ${category} VALUES (${values})`, (err, results) => {
                if (err){
                    return reject(err);
                }else{
                    resolve("Success");
                }
            });
        }).catch((err) => ErrorHandler(err));
    }

    // Check what kind of data user want
    if(data.Category === "addemployyes"){
        // Employees
        let Data;
        await AddReq("employees", data).then(data => Data=data);
        return Data
    } else if(data.Category === "addorder"){
        // Orders
        let InnerData = {
            Itemid: data.itemid,
            User: data.user,
            Timestamp: "CURRENT_TIMESTAMP",
            IsDone: "DEFAULT",
            Store: data.store
        }

        let Data;
        await AddReq("orders", InnerData).then(data => Data=data);
        return Data
    } else if(data.Category === 'addpayment'){
        // Payments
        let InnerData = {
            Name: data.name,
            Amount: data.amount,
            IsDone: "DEFAULT",
            Date: data.date
        }

        let Data;
        await AddReq("payments", InnerData).then(data => Data=data);
        return Data
    } else if(data.Category === "addstock") {
        // Stock from stores
        let Data;
        await AddReq("stock", data).then(data => Data=data);
        return Data
    } else if(data.Category === "addstore"){
        // Stores
        let Data;
        await AddReq("stores", data).then(data => Data=data);
        return Data
    } else {
        return ("Seems like there you didnt specify category of your data")
    }
}

module.exports = {
    addData
}