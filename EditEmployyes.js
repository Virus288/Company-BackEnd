const {con} = require("./DBConnect")

const EditEmployyes = async (data) => {
    let userId;
    let query = `Update employees SET `

    Object.keys(data).forEach(info => {
        query += `${info} = '${data[info]}', `
        userId = data.id
    })
    query = query.slice(0, -2);
    query += ` WHERE employees.id = ${userId};`

    return new Promise((resolve, reject) => {

        con.query(query, (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve("Success");
            }
        });

    });

}

module.exports = {
    EditEmployyes
}