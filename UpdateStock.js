const {con} = require("./DBConnect")

const AddStock = async (itemid, stock) => {

    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO stock VALUES (${itemid}, ${stock})`, (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve("Success");
            }
        });
    });

}

module.exports = {
    AddStock
}

