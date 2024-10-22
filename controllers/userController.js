const userService = require('../services/userService');

const userController = {
    getAllUsers: async (req, res) => {
        console.log('llamando a getAllUser')
        try {
            const searchQuery = req.query.search || '';
            const users = await userService.searchUsers(searchQuery);
            res.render('index', { users,searchQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                return res.render('create', { errors: error.errors });
            }
            res.status(500).send('Error interno del servidor');
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).send('El usuario no existe');
            res.json(user); // Devuelve el usuario en formato JSON
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).send('El usuario no existe');
    
            // Intenta actualizar el usuario
            await userService.updateUser(req.params.id, req.body);
            res.redirect('/');
        } catch (error) {
            console.error(error); // Registrar el error
            if (error.name === 'SequelizeValidationError') {
                // Obtener el usuario nuevamente para mostrar en la vista
                const user = await userService.getUserById(req.params.id);
                return res.render('edit', { user, errors: error.errors }); // Pasar los errores
            }
            res.status(500).send('Error interno del servidor');
        }
    },
    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

module.exports = userController;