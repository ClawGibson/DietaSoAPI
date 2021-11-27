const Usuarios = require('../models/Usuarios');
const Alimentos = require('../models/Alimentos');
const { response } = require('express');
const mongoose = require('mongoose');

const buscarUsuario = async (userId, res = response) => {
    try {
        const existeUsuario = await Usuarios.findById(
            mongoose.Types.ObjectId(userId)
        );

        if (!existeUsuario)
            return res
                .status(400)
                .json({ success: false, message: 'El usuario no existe.' });

        return existeUsuario;
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Ocurrió un error al buscar el usuario - ${err.message}`,
        });
    }
};

const buscarAlimento = async (alimentoId, res = response) => {
    try {
        const alimento = await Alimentos.findById(
            mongoose.Types.ObjectId(alimentoId)
        );

        if (!alimento)
            return res.status(404).send({
                Error: 'No se encontró el alimento proporcionado',
            });
        return alimento;
    } catch (error) {
        return res.status(500).json({
            error: `Error al buscar el alimento - ${error}`,
        });
    }
};

const buscarAlimentoPorNombre = async (alimentoNombre, res = response) => {
    try {
        const alimento = await Alimentos.findOne({
            nombreAlimento: alimentoNombre,
        });

        if (!alimento)
            return res.status(404).send({
                Error: 'No se encontró el alimento proporcionado',
            });
        return alimento;
    } catch (error) {
        return res.status(500).json({
            error: `Error al buscar el alimento - ${error}`,
        });
    }
};

module.exports = { buscarUsuario, buscarAlimento, buscarAlimentoPorNombre };
