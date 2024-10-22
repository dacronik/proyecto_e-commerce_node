const { Op } = require('sequelize');
const User = require('../models/user');

const userService = {
    createUser: async (userData) => {
        try {
            return await User.create(userData);
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    },
    getAllUsers: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    },
    getUserById: async (id) => {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    },
    updateUser: async (id, userData) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return await user.update(userData);
    },
    deleteUser: async (id) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return await user.destroy();
    },
    searchUsers: async (query) => {
        try {
            return await User.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query}%` }},
                        { lastName: { [Op.iLike]: `%${query}%` }},
                        { email: { [Op.iLike]: `%${query}%` }},
                        { rut: { [Op.iLike]: `%${query}%` }}
                    ]
                }
            });
        } catch (error) {
            throw new Error('Error al buscar usuarios: ' + error.message);
        }
    }
};

module.exports = userService;