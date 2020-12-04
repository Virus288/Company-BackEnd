const {con} = require("./DBConnect")

const Updateorders = async (done, id) => {

    if(done === false){
        query = `UPDATE orders SET IsDone = "0" WHERE id = ${id}`
    } else {
        query = `UPDATE orders SET IsDone = "1" WHERE id = ${id}`
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
    Updateorders
}