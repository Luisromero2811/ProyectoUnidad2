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
    //Función para actualizar producto
    async ActualizarProducto ({request, response, params})
    {
        const Product=await Producto.find(params.id)
        Product.merge(request.post())
        await Product.save()
        response.json({
            "Se han actualizado los datos correctamente":Product
        })
    }
    //Función para eliminar producto
    async EliminarProducto ({response, params})
    {
    const { id } = params
    const product = await Producto.find(id)
    await product.delete()
    return response.json({
        Productos: "Eliminado con exito"
    })
    }
}

module.exports = ProductController
