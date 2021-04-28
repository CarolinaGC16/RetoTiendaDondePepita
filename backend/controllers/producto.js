let Producto = require("../models/producto");


const registrarProducto = (req, res) => {
    
    let params = req.body;
   
    let producto = new Producto();
    
    producto.name = params.name;
    producto.description = params.description;
    producto.cost = params.cost;
    
    producto.save((err, saveProducto) => {
        
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (saveProducto) {
                res.status(200).send({producto: saveProducto});
            } else {
                res.status(401).send({mensaje: "No se pudo registrar el producto"})
            }
        }
    });
    };


    const buscarProducto = (req, res) => {
        
        let id = req.params["id"];
       
        Producto.findById({_id:id}, (err, datosProducto) => {
            
            if (err) {
              res.status(500).send({ mensaje: "Error al conectar al servidor" });
            } else {
                if (datosProducto) {
                  res.status(200).send({ producto: datosProducto });
                } else {
                  res.status(401).send({ mensaje: "el producto no existe" });
                }
            }
        });
      };



const listaProducto = (req, res) => {
    
    let name = req.params["name"];
    //Busqueda de las categorias
    Producto.find({name : new RegExp(name, "i")}, (err, datosProducto) => {
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
              if (datosProducto) {
                res.status(200).send({ categoria: datosProducto });
              } else {
                res.status(401).send({ mensaje: "No hay productos" });
              }
          }
    } );
};      


module.exports = {
    registrarProducto,
    buscarProducto,
    listaProducto,
}