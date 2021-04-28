let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");



let port = process.env.PORT || 3002;

let app = express();

let usuarioRoutes = require("./routes/usuario");


mongoose.connect("mongodb://localhost:27017/retotiendadondepepitadb",{useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
    if (err) {
        
        throw err;
        
    } else {
        console.log("Servidor DB: FUNCIONA");
        app.listen(port, function () {
            console.log("Servidor Backend funcionando en el puerto :" + port);
        })
    }
});

//Analizar la codificacion de las url
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use("/api",usuarioRoutes);

module.exports = app;