const {con} = require("./DBConnect")

const getEmployyes = async (employee) => {
    let query;
    if(employee){
        query = `SELECT * FROM employees where id = '${employee}'`
    } else {
        query = `SELECT * FROM employees`
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
    getEmployyes
}