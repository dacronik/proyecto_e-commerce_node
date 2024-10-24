const Producto = require('../models/producto');

const ProductService = {
    getAllProducts: async () => {
        try {
            return await Producto.findAll();
        } catch (error) {
            throw new Error('Error al obtener los productos: '+ error.message);
        }
    },
    getProductById: async (id) => {
        try {
            return await Producto.findByPk(id);
        } catch (error) {
            throw new Error('Error al obtener el producto: '+ error.message);
        }
    },
    getProductByCategory: async (category) =>{
        try {
            return await Producto.findAll({where: { category }});
        } catch (error) {
            throw new Error('Error al obtener productos por categoría: '+ error.message);
        }
    },
    createProduct: async (productData) => {
        try {
            return await Producto.create(productData);
        } catch (error) {
            throw new Error('Error al crear el producto: '+ error.message);
        }
    },
    updateProduct: async (id, productData) => {
        try {
            const product = await Producto.findByPk(id);
            if (!product) return false;
            await product.update(productData);
            return true;
        } catch (error) {
            throw new Error('Error al actualizar el producto: '+ error.message);
        }
    },
    deleteProduct: async (id) => {
        try {
            const product = await Producto.findByPk(id);
            if (!product) return false;
            await product.destroy();
            return true;
        } catch (error) {
            throw new Error('Error al eliminar el producto: '+ error.message);
        }
    }
}

module.exports = ProductService;