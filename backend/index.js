require("dotenv").config(); //"ACTIVA" las variables de entorno para que puedan ser utilizadas
console.log(process.env.NODE_ENV); //imprime el entorno en el cual se esta ejecutando
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

require("./database");

//initialization
const app = express();
//settings
app.set("port", process.env.PORT || 3000);

//middlewares:
//cada middleware de express osn funciones
//cada ruta que llega del cliente pasara por aqui
//entonces cada funcion podra hacer algo
app.use(morgan("dev"));

//configuracion del multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"), //ubicacion del archivo
  filename(re, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname)); //nombre que va a tener el archivo
  },
});

//se indica que el parametro que debe supervisar el multer son images
app.use(multer({ storage }).single("image"));

//urlencoded : ayuda a interpretar datos del formulario como si fuera un json
app.use(express.urlencoded({ extended: false }));

//para que interprete peticiones json
app.use(express.json());

//configura los cors
app.use(cors());

//Routes
app.use("/api/books", require("./routes/books"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//start the server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
