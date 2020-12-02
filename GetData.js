const {con} = require("./DBConnect")

const getData = async (category, id) => {
    let categories = ["koce", "koldry", "poduszki", "posciele", "przescieradla", "reczniki"];
    let query;

    if(!categories.includes(category)){
        return ("");
    }

    if (id && !category){
        query = "SELECT * FROM poduszki where id = " + con.escape(id) + "";
    } else if(category && !id) {
        query = "SELECT * FROM " + category + "";
    } else if(category && id) {
        query = "SELECT * FROM " + category + " where id = " + con.escape(id) + "";
    } else {
        return ("No params")
    }

    return new Promise((resolve, reject) => {
        console.log(query)
        con.query(query, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    getData
}