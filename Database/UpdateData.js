const {con} = require("./DBConnect")

const updateData = async (data) => {
    // Error handler
    const ErrorHandler = (err) => {
        if(err.errno == "1062"){
            return(`Item that you are trying to register, already exists in database. If you are trying to edit that item, go to "edit items in stock"`)
        } else {
            return(`Seems like we have an error. Developer information ${err.errno}`)
        }
    }

    // Get request from database
    const AddReq = async (category, data) => {
        if (category === "employees") {
            let values = "";

            for (let i = 0; i < Object.keys(data).length; i++) {
                if (Object.keys(data)[i] !== "Category") {
                    if (Object.keys(data)[i] !== "id") {
                        if ((i + 1) === Object.keys(data).length) {
                            values += `${Object.keys(data)[i]} = '${data[Object.keys(data)[i]]}'`
                        } else {
                            values += `${Object.keys(data)[i]} = '${data[Object.keys(data)[i]]}', `
                        }
                    }
                }
            }

            return new Promise((resolve, reject) => {
                con.query(`Update ${category} SET ${values} WHERE id = ${data.id}`, (err, results) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve("Success");
                    }
                });
            }).catch((err) => ErrorHandler(err));

        } else {

            return new Promise((resolve, reject) => {
                con.query(`Update ${category} SET amount = ${data.Amount} WHERE ItemId = ${data.Number}`, (err, results) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve("Success");
                    }
                });
            }).catch((err) => ErrorHandler(err));
        }
    }

    // Check what kind of data user want
    if(data.Category === "editemployyes"){
        // Employees
        let Data;
        await AddReq("employees", data).then(data => Data=data);
        return Data
    } else if(data.Category === "editStock") {
        // Stock
        let Data;
        await AddReq("stock", data).then(data => Data = data);
        return Data
    } else {
        return ("Seems like there you didnt specify category of your data")
    }
}

module.exports = {
    updateData
}