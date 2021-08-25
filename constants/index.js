/** @format */

const Usuarios = require('../models/Usuarios');
const { response } = require('express');
const mongoose = require('mongoose');

const buscarUsuario = async (userId, res = response) => {
    try {
        const existeUsuario = await Usuarios.findById(
            mongoose.Types.ObjectId(userId)
        ).select('nombre');

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

module.exports = { buscarUsuario };
