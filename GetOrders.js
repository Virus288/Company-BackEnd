const {con} = require("./DBConnect")

const getOrders = async (data) => {
    if(data.done){
        query = `SELECT * FROM orders WHERE IsDone = ${data.done}`
    } else {
        query = `SELECT * FROM orders`
    }

    return new Promise((resolve, reject) => {
        con.query(query, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });

}

module.exports = {
    getOrders
}