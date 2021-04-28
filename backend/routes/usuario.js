let express = require("express");

let Usuario = require("../controllers/usuario");



let api = express.Router();

http://localhost:3002/api/registrarUsuario
api.post("/registrarUsuario", Usuario.registrarUsuario);

module.exports = api;