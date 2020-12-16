const {con} = require("./DBConnect")

const getSalesStats = async (data) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM SalesStats', (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve(results);
            }
        });
    });

}

module.exports = {
    getSalesStats
}