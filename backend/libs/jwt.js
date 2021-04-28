let jwt = require("jwt-simple");
//
let moment = require("moment");


let hidden = "retotiendadonde16pepita";


exports.createToken = function (usuario) {
    let  payload ={
        _id: usuario._id,
        names: usuario.names,
        surnames: usuario.surnames,
        age: usuario.age,
        email: usuario.email,
        iat: moment().unix(),

    }
    return jwt.encode(payload, hidden);
};