'use strict'
const Producto = use('App/Models/Producto')
class ProductController {
    //Método de inserción de producto, Nombre, Descripción y Precio
    async NuevoProducto ({request,response})
    {
            const productData = request.only(['Nombre', 'Descripcion', 'Precio'])    
            const product = await Producto.create(productData)
        return response.json({
            "Se ha agregado un nuevo producto con sus datos:" : product
        })      
          }
    //Función para consulta de productos
    async ListasProducto ({response}){
        const Productos = await Producto.all()
           response.status(200).json({
            mensaje:"La lista de tus productos son:",
            datos:Productos
        })
    }
}

module.exports = ProductController
