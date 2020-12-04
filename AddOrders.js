const {con} = require("./DBConnect")

const AddOrders = async (itemid, store, user) => {

    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO orders VALUES (null, '${itemid}', '${user}', CURRENT_TIMESTAMP, 0, '${store}');`, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });

}

module.exports = {
    AddOrders
}