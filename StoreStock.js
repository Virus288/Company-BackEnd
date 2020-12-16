const {con} = require("./DBConnect")

const GetStoreStock = async (store) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM StoresStock where store LIKE '${store}'`, (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve(results);
            }
        });
    });

}

module.exports = {
    GetStoreStock
}