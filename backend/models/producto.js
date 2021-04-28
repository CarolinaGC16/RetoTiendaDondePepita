let mongoose = require("mongoose");


let Schema = mongoose.Schema;

let productoSchema = Schema({
    name: String,
    description: String,
    cost: Number,

});

module.exports = mongoose.model("producto", productoSchema);