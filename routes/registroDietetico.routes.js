const Alimentos = require('../models/Alimentos');
const RegistroDietetico = require('../models/RegistroDietetico');
const Usuarios = require('../models/Usuarios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const registroDietetico = await RegistroDietetico.find();

    if (!registroDietetico) return res.status(500).send({ success: false });

    res.send(registroDietetico);
});

router.get('/:id', async (req, res) => {
    const registroDieteticoDeUsuario = await RegistroDietetico.findById(req.params.id);

    if (!registroDieteticoDeUsuario)
        return res
            .status(500)
            .send({ data: [], message: 'El usuario aún no tiene registros dietéticos' });

    res.send(registroDieteticoDeUsuario);
});

router.post('/', async (req, res) => {
    let nuevoRegistro = new RegistroDietetico({
        idUsuario: req.body.id,
        agua: req.body.agua,
        ejercicio: req.body.ejercicio,
        alimentos: req.body.alimentos,
    });

    nuevoRegistro = await nuevoRegistro.save();

    if (!nuevoRegistro)
        return res
            .status(500)
            .send({ success: false, message: 'No se pudo crear el registro de usuario :c' });

    res.send(nuevoRegistro);
});

router.put('/:id', async (req, res) => {
    let registro = await RegistroDietetico.findByIdAndUpdate(req.params.id, {
        idUsuario: req.body.id,
        agua: req.body.agua,
        ejercicio: req.body.ejercicio,
        alimentos: req.body.alimentos,
    });

    registro = await registro.save();

    if (!registro)
        return res.status(400).send('Algo salió mal, no se pudo editar el registro.');

    res.send(registro);
});

module.exports = router;
