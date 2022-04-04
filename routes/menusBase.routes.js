const Alimentos = require('../models/Alimentos');
const MenusBase = require('../models/MenusBase');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const ingredientesList = await MenusBase.find();

    if (!ingredientesList) res.status(500).json({ succes: false });

    res.send(ingredientesList);
});

router.get('/:id', async (req, res) => {
    const baseMenu = await MenusBase.findById(req.params.id);

    !baseMenu
        ? res.status(500).json({
              succes: false,
              message: 'No se encontró el menú base que buscaba :c',
          })
        : res.send(baseMenu);
});

router.post('/', async (req, res) => {
    try {
        let menuBase = new MenusBase({ ...req.body });

        menuBase = await menuBase.save();

        if (!menuBase)
            return res.status(400).send('No se pudo crear el menú base :c');

        res.status(200).send(menuBase);
    } catch (err) {
        console.log('Error al crear un menu base', err);
        return res.status(500).send({
            success: false,
            message: 'Error al crear un menu base',
            error: err,
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const menuBaseEditar = await MenusBase.findOneAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            {
                new: true,
            }
        );
        console.log('->', menuBaseEditar);
        if (!menuBaseEditar)
            return res.status(204).send({
                succes: false,
                message:
                    'No se pudo editar el menú base u ocurrió algún error inesperado',
                error: error,
            });

        res.status(200).send(menuBaseEditar);
    } catch (error) {
        console.log('Error al actualizar un menu base', error);
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar un menu base',
            error: error,
        });
    }
});

module.exports = router;
