const { promisify } = require('util')
const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config();


function attachAsyncMethods(pool) {
    pool.queryAsync = (sql, values) => {
        return promisify(pool.query).call(pool, sql, values)
    }
}

function initAuroraConn() {
    
    var pool = mysql.createPool({
        // connectionLimit : 5,
        host            : process.env.aurora_server, 
        user            : process.env.aurora_userdb, 
        password        : process.env.aurora_password, 
        database        : process.env.aurora_database,
        port            : process.env.aurora_port,
    })

    pool.on("connection", () => console.log("DB Connected!"));

    attachAsyncMethods(pool)

    return pool
}

module.exports = initAuroraConn()
