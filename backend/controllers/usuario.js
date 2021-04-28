let Usuario = require("../models/usuario");

let bcrypt = require("bcrypt-nodejs");

let jwt = require("../libs/jwt");


// Funcion para registrar el usuario
const registrarUsuario = (req, res) => {
    
    let params = req.body;
    
    let usuario = new Usuario();
    
    if (
      params.names &&
      params.surnames&&
      params.age &&
      params.email &&
      params.pass &&
      params.rol
    ) {
     
      bcrypt.hash(params.pass, null, null, (err, hash) => {
        
        if (hash) {
          usuario.names = params.names;
          usuario.surnames = params.surnames;
          usuario.age = params.age;
          usuario.email = params.email;
          usuario.pass = hash;
          usuario.rol = params.rol;
          
          usuario.save((err, saveUsuario) => {
            if (err) {
             
              res.status(500).send({ err: "No se registro el usuario" });
            } else {
              
              res.status(200).send({ usuario: saveUsuario });
            }
          });
        }
      });
    } else {
      // Damos respuesta con codigo HTTP de error y enviamos el error a consola
      res.status(405).send({ err: "Faltaron campos por llenar" });
    }
  };
  


      
   

//login
const login = (req, res) => {
//variable para los parametros que llegan
let params = req.body;
//buscamos el usuario en BD
Usuario.findOne({email: params.email}, (err, datosUsuario) => {
if (err) {
    res.status(500).send({mensaje: "Error del servidor"});
} else {
    if (datosUsuario) {
        bcrypt.compare(params.pass, datosUsuario.pass, function (err, confirm) {
            if (confirm) {
                if (params.getToken) {
                    res.status(200).send({ jwt: jwt.createToken (datosUsuario),
                        //user: datosUsuario,
                    });
                } else {
                    res.status(200).send({Usuario: datosUsuario, mensaje: "Sin token"})
                } 
            } else {
                res.status(401).send({mensaje: "correo o password incorrectos"});
            }
           
        });
    } else {
        res.status(401).send({mensaje: "correo o password incorrectos"});
    }
}
});

};
 
module.exports = {
    registrarUsuario,
    login,
};