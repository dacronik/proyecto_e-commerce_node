const productService = require('../services/productService');
const categoyService = require('../services/categoyService');

const productController = {
    getAllProducts: async (req, res) => {
        console.log('llamando a getAllProducts')
        try {
            const products = await productService.getAllProducts();
            const categories = await categoyService.getAllCategories();
            res.render('productos', { products, categories });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    getProductById: async (req, res) => {
        
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({error: 'Producto no encontrado'});
            }
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error interno del servidor'});
        }
    },
    getProductByCategory: async (req, res) => {
        console.log('llamando a getProductByCategory')
        try {
            const products = await productService.getProductByCategory(req.params.category);
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    createProduct: async (req, res) => {
        try {
            const product =await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto', details: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            await productService.updateProduct(req.params.id, req.body);
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Error de validación', details: error.errors });
            }
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            await productService.deleteProduct(req.params.id);
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};

module.exports = productController;