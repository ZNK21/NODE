const { ifError } = require("assert");
var mssql = require("mssql");
var configSql = require("../connection/sqlconnect");

exports.all = async function (req, res) {
    (async function () {
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso.query("SELECT * FROM personas", function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    var registros = data.recordsets[0]
                    if (data.rowsAffected > 0) {
                        res.status(200).send(registros);
                    } else {
                        res.status(418).send(false)
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    })();
}

exports.borrareg = async function (req, res) {
    (async function () {
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso
                .input("id", mssql.Int, req.params.id)    //Se usa input , se asigna un nombre al parametro, se llama el paquete de mssql junto con el tipo de dato, y se asigna el parametro a recibir
                .query("DELETE FROM personas WHERE id = @id", function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        if(data.rowsAffected > 0){
                        res.status(200).send(true)
                        }else{
                            res.status(418).send(false)
                        }
                    }
                })
        } catch (err) {
            console.log(err);
        }
    })();
}

exports.nuevoreg = async function (req, res) {
    (async function () {
        if(req.body.nombre == null || req.body.nombre == ""){
            return res.status(200).send({estado:false, mensaje: "El campo nombre es obligatorio"})
        }
        if(req.body.apellido == null || req.body.apellido == ""){
            return res.status(200).send({estado:false, mensaje: "El campo apellido es obligatorio"})
        }
        if(req.body.telefono == null || req.body.telefono == ""){
            return res.status(200).send({estado:false, mensaje: "El campo telefono es obligatorio"})
        }
        if(req.body.email == null || req.body.email == ""){
            return res.status(200).send({estado:false, mensaje: "El campo email es obligatorio"})
        }
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso
                .input("nombre", mssql.NVarChar, req.body.nombre)
                .input("apellido", mssql.NVarChar, req.body.apellido)
                .input("telefono", mssql.NVarChar, req.body.telefono)
                .input("email", mssql.NVarChar, req.body.email)


                .query("INSERT INTO personas VALUES (@nombre, @apellido, @telefono, @email)", function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if(data.rowsAffected > 0){
                        res.status(200).send(true)
                        }else{
                            res.status(418).send(false)
                        }
                    }
                })
        } catch (err) {
            console.log(err);
        }
    })();
}

exports.actualizareg = async function (req, res) {
    (async function () {
        if(req.body.id == null || req.body.id == ""){
            return res.status(200).send({estado:false, mensaje: "Ha ocurrido un error con el ID, contacte al administrador"})
        }
        if(req.body.nombre == null || req.body.nombre == ""){
            return res.status(200).send({estado:false, mensaje: "El campo nombre es obligatorio"})
        }
        if(req.body.apellido == null || req.body.apellido == ""){
            return res.status(200).send({estado:false, mensaje: "El campo apellido es obligatorio"})
        }
        if(req.body.telefono == null || req.body.telefono == ""){
            return res.status(200).send({estado:false, mensaje: "El campo telefono es obligatorio"})
        }
        if(req.body.email == null || req.body.email == ""){
            return res.status(200).send({estado:false, mensaje: "El campo email es obligatorio"})
        }
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso
                .input("id", mssql.Int, req.body.id)
                .input("nombre", mssql.NVarChar, req.body.nombre)
                .input("apellido", mssql.NVarChar, req.body.apellido)
                .input("telefono", mssql.Int, req.body.telefono)
                .input("email", mssql.NVarChar, req.body.email)

                .query("UPDATE personas SET nombre = @nombre , apellido = @apellido , telefono = @telefono , email = @email WHERE id = @id", function (err, data) {
                    if (err) {
                        console.log(err);
                    }else{
                        if(data.rowsAffected > 0){
                    res.status(200).send(true)
                        }else{
                            res.status(418).send({estado:false, mensaje: "Ha ocurrido un error, contacte al administrador"})
                        }
                    }
                })
        } catch (err) {
            console.log(err);
        }
    })();
}

exports.buscareg = async function (req, res) {
    (async function () {
        if(req.query.id == null || req.query.id == ""){
            return res.status(200).send({estado:false, mensaje: "Este registro no existe"})
        }
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso
                .input("id", mssql.Int, req.query.id)
                .query("SELECT * FROM personas WHERE id = @id", function (err, data) {
                    if (err) {
                        console.log(err);
                    }else{
                    var registros = data.recordsets[0]
                    res.status(200).send(registros)
                    }
                })
        } catch (err) {
            console.log(err);
        }
    })();
}

exports.busca = async function (req, res) {
    (async function () {
        if(req.query.nombre == null || req.query.nombre == ""){
            return res.status(200).send({estado:false, mensaje: "Este registro no existe"})
        }
        try {
            const conectar = await configSql.conexion();
            var proceso = await conectar.request();

            proceso
                .input("nombre", mssql.NVarChar, req.query.nombre)
                .query("SELECT * FROM personas WHERE nombre = @nombre", function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var registros = data.recordsets[0]
                        if (registros == null || registros == "") {
                            res.status(418).send(err);
                        } else {
                            res.status(200).send(registros);
                        }
                    }
                })
        } catch (err) {
            console.log(err);
        }
    })();
}