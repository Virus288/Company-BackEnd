const {con} = require("./DBConnect")

const UpdateDone = async (data) => {
    console.log(data)

    // Error handler
    const ErrorHandler = (err) => {
        console.log(err)
        if(err.errno == "1062"){
            return(`Item that you are trying to register, already exists in database. If you are trying to edit that item, go to "edit items in stock"`)
        } else {
            return(`Seems like we have an error. Developer information ${err.errno}`)
        }
    }

    // Post request to database
    const AddReq = async (category, data) => {
        let values = "";
        for(let i = 0; i < Object.keys(data).length; i++){
            if(Object.keys(data)[i] !== "Category" && Object.keys(data)[i] !== "id"){
                values += `${Object.keys(data)[i]} = ${data[Object.keys(data)[i]]}`
            }
        }

        return new Promise((resolve, reject) => {
            con.query(`Update ${category} SET ${values} WHERE id = ${data.id}`, (err, results) => {
                if (err){
                    return reject(err);
                }else{
                    resolve("Success");
                }
            });
        }).catch((err) => ErrorHandler(err));
    }

    // Check what kind of data user want
    if(data.Category === "orders"){
        // Orders

        let Data;
        await AddReq("orders", data).then(data => Data=data);
        return Data
    } else if(data.Category === "payments"){
        // Payments

        let Data;
        await AddReq("payments", data).then(data => Data=data);
        return Data
    } else {
        return ("Seems like there you didnt specify category of your data")
    }
}

module.exports = {
    UpdateDone: UpdateDone
}