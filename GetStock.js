const {con} = require("./DBConnect")

const getStock = async (data) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM stock', (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve(results);
            }
        });
    });

}

module.exports = {
    getStock
}