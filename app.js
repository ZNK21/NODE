var express = require("express"); //Express para levantar servidor mas simplemente
var cors = require("cors"); //Cors para evitar errores y usar config de headers de navegadores
var connect = require("./connection/sqlconnect");

var app = express();
app.use(express.json());
app.use(cors());
app.use("/", express.static("./views"))
app.set("port", 5000);

var router = express.Router();
app.use("/", router); // http://localhost:puerto/ruta

router.all('*', function (req, res, next) { //Configuracion para la cabecera 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});


//Forma 1
// app.get("/registros", function(req, res){
// 	(async function(){
//         try{
//             const conectar = await connect.conexion(); // se hace la conexion
//             var proceso = await conectar.request(); //se declaran las funciones de request

//             proceso.query("SELECT * FROM personas", function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     var registros = data.recordsets[0]
//                     console.log(registros);

//                     res.status(200).send(registros);
//                 }
//             })

//         }catch(err){
//             console.log(err);
//         }
// 	})();
// })

//Forma 2
var funciones = require("./endpoints/funciones")
router.get("/api/v1/all", funciones.all, function(req, res){})

router.delete("/api/v1/borrareg/:id", funciones.borrareg, function (req, res) {})

router.post("/api/v1/nuevoreg", funciones.nuevoreg, function (req, res){})

router.put("/api/v1/actualizareg", funciones.actualizareg, function (req, res){})

router.get("/api/v1/buscareg", funciones.buscareg, function (req, res){})

router.get("/api/v1/buscar", funciones.busca, function (req, res){})


app.listen(app.get("port"), function(){ // Se inserta el puerto y se crea la funcion
    (async function(){
        try{
            const sqlserver = await connect.conexion(); //Aca se hace el llamado a la funcion conexion en el archivo sqlconnect
            if (sqlserver) {
                console.log("Conexion al motor de base de datos exitosa")
                console.log("Servidor ejecutado en URL http://localhost:5000")
            }
        }catch(err){
            console.log(err);
        }
    })();
})