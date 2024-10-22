const { DataTypes } = require('sequelize');
const { sequelize } = require('../data/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: function (value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(value)) {
                    throw new Error('Email no válido');
                }
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;