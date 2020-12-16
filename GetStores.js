const {con} = require("./DBConnect")

const getStores = async (store) => {
    let query;
    if(store){
        query = `SELECT * FROM StoresStock where store = '${store}'`
    } else {
        query = `SELECT * FROM stores`
    }

    return new Promise((resolve, reject) => {
        con.query(query, (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve(results);
            }
        });
    });
}

module.exports = {
    getStores
}