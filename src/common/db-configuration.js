
const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env.DB_SERVER + "-->" + typeof process.env.DB_SERVER);
// console.log(process.env.DB_PORT + "-->" + typeof parseInt(process.env.DB_PORT));
// console.log(process.env.DB_USER + "-->" + typeof process.env.DB_USER);
// console.log(process.env.DB_PWD + "-->" + typeof process.env.DB_PWD);
// console.log(process.env.DB_NAME + "-->" + typeof process.env.DB_NAME);
// return;

const mssql = require("mssql");
const dbConfig = {
    server: 'SRVMNTDB3\\MSSQLSERVER2014',
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 30000,
    options: {
        enableArithAbort: true,
        validateBulkLoadParameters:false,
        encrypt: false        
        //trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

// This will log if there is any error...
mssql.on('error', (err)=> {
    console.log(err);
});


module.exports = {
    mssql,
    dbConfig
}