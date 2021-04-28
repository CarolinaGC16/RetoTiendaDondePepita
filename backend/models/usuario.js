let mongoose = require ("mongoose");

let Schema = mongoose.Schema;


let usuarioSchema = Schema ({
    names: String,
    surnames: String,
    age: Number,
    email: String,
    pass: String,
    rol: String,

});

module.exports = mongoose.model("usuario", usuarioSchema);