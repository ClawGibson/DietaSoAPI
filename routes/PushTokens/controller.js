const { response } = require('express');
const mongoose = require('mongoose');

const PushToken = require('../../models/Recordatorios/pushToken.js');

const createNewPushToken = async (req, res = response) => {
    try {
        let newPushToken = new PushToken({
            usuario: req.body.usuario,
            token: req.body.token,
        });
        newPushToken = await newPushToken.save();
        if (!newPushToken) {
            return res.status(400).json({
                msg: 'es necesario mandar información en la petición',
            });
        }
        res.status(200).send({ token: newPushToken.token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
};

const getSelected = async (req, res = response) => {
    try {
        const { seleccionado } = req.query;
        const tokens = await PushToken.find({
            usuario: mongoose.Types.ObjectId(seleccionado),
        });
        if (tokens.length === 0 || !tokens) {
            return res.status(204).send({ msg: 'no hay datos' });
        }
        res.status(200).send(tokens);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getPushTokens = async (req, res = response) => {
    console.log('ok');
};

const actualizarPushToken = async (req, res = response) => {
    try {
        const { usuario } = req.body;
        const { token } = req.body;
        console.log('Usuario:', usuario, '\nToken: ', token);
        const remplazado = await PushToken.findOneAndUpdate(
            { usuario: usuario },
            { token: token },
            { new: true }
        );
        console.log('Reemplazado: ', remplazado);
        if (!remplazado) {
            return res.status(400).json({ msg: 'Ha ocurrido un error' });
        }
        return res.status(200).json({ msg: 'Se ha actualizado' });
    } catch (error) {
        console.log('Ocurrió un error al actualizar el token', error);
        res.status(500).json(error);
    }
};
module.exports = {
    createNewPushToken,
    getSelected,
    getPushTokens,
    actualizarPushToken,
};
