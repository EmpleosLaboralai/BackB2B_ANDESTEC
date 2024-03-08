const pool_aurora = require("../../config/db/auroraConnection");

function getProcedure(procedure, parameters, callback) {
    pool_aurora.query(callProcedure(procedure,parameters), parameters, (error, results, fields) => {
        if (error) {
            callback(error);
        }else{
            let jsonResponse = JSON.stringify(results);
            let json =  JSON.parse(jsonResponse);
            callback(json[0]);
        }
    });
}

function callProcedure(procedure, parameters){
    let params = "";
    parameters.forEach(function (parameter) {
        params += "?,";
    });
    params = params.substr(0,params.length-1);

    return "CALL "+procedure+"("+params+")";
}

module.exports = {
    getProcedure
}