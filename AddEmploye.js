const {con} = require("./DBConnect")

const AddEmploye = async (data) => {
    console.log(data)

    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO employees VALUES (null, '${data["Name"]}', '${data["Adress"]}', '${data["Workplace"]}', '${data["Phonenumber"]}', '${data["Birthday"]}', '${data["Hiredate"]}', '${data["Salary"]}')`, (err, results) => {
            if (err){
                return reject(err.sqlMessage);
            }else{
                resolve("Success");
            }
        });
    });

}

module.exports = {
    AddEmploye
}