var mssql = require("mssql");

exports.conexion = function(){
    var config = {
        user: '####',
        password: '####',
        server: '####',
        port: ####,
        database: '####',
        options: {
            enableArithAbort: true
        },
        trustServerCertificate: true
    }

    const conectar = new mssql.ConnectionPool(config).connect().then(pool => {
        return pool
    }).catch(err => console.log("Error al conectarse al motor de base de datos"))

    return conectar
}