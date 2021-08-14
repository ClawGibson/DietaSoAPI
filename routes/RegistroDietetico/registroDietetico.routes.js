/** @format */

const Alimentos = require('../../models/Alimentos');
const RegistroDietetico = require('../../models/RegistroDietetico');
const Usuarios = require('../../models/Usuarios');
const express = require('express');
const router = express.Router();

const buscarRegistroDietetico = async (id) => {
    try {
        const buscarRegistroDietetico = await RegistroDietetico.find({
            usuario: id,
        });

        if (!buscarRegistroDietetico)
            return res.status(404).send({
                Error: 'No se encontró el registro dietético proporcionado',
            });
        return buscarRegistroDietetico;
    } catch (error) {
        return res.status(500).json({
            error: `Error al buscar el registro dietético - ${error}`,
        });
    }
};

router.get('/', async (req, res) => {
    try {
        const buscarRegistros = await RegistroDietetico.find();

        if (!buscarRegistros)
            return res.status(404).send({
                succes: false,
                message: 'No se encontraron registros',
            });
        res.send(buscarRegistros);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/details', async (req, res) => {
    try {
        const buscarUsuario = await Usuarios.findById(req.query.usuario);

        if (!buscarUsuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const registrosDeUsuario = await RegistroDietetico.findById(
            req.query.usuario
        );

        if (!registrosDeUsuario)
            return res.status(404).send({
                message: 'El usuario aún no cuenta con registros dietéticos',
            });

        res.send(registrosDeUsuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const buscarUsuario = await Usuarios.find({ id: req.body.usuario });

        if (!buscarUsuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const buscarAlimento = await Alimentos.find({ _id: req.body.alimento });

        if (!buscarAlimento)
            return res
                .status(404)
                .send({ Error: 'No se encontró el alimento proporcionado' });

        let nuevoRegistroDietetico = new RegistroDietetico({
            usuario: req.body.usuario,
            alimentos: req.body.alimentos,
            agua: req.body.agua,
            ejercicio: req.body.ejercicio,
        });

        nuevoRegistroDietetico = nuevoRegistroDietetico.save();

        if (!nuevoRegistroDietetico)
            return res
                .status(500)
                .json({ error: 'Error al guardar el registro' });
        res.status(200).send(nuevoRegistroDietetico);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/agregarAlimento/', async (req, res) => {
    try {
        const buscarUsuario = await Usuarios.findById(req.query.usuario);

        if (!buscarUsuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const buscarAlimento = await Alimentos.findById(req.body.alimento);

        if (!buscarAlimento)
            return res
                .status(404)
                .send({ Error: 'No se encontró el alimento proporcionado' });

        let registro = await buscarRegistroDietetico(req.query.usuario);

        const registroAModificar = registro[0].alimentos.filter(
            (alimento) => alimento.idAlimento.toString() == req.body.alimento
        );

        if (registroAModificar.length > 0) {
            const index = registro[0].alimentos.indexOf(registroAModificar[0]);

            registro[0].alimentos[index] = {
                idAlimento: registro[0].alimentos[index].idAlimento,
                cantidad: req.body.cantidad,
                tipo: req.body.tipo,
                fecha: req.body.fecha,
                lugar: req.body.lugar,
                menuPreparacion: req.body.menuPreparacion,
            };

            registro = registro[0].save();

            if (!registro)
                return res
                    .status(500)
                    .json({ error: 'Error al guardar el registro' });
            res.status(200).send('Actualizado');
        } else {
            registro[0].alimentos = registro[0].alimentos = [
                ...registro[0].alimentos,
                {
                    idAlimento: req.body.alimento,
                    cantidad: req.body.cantidad,
                    tipo: req.body.tipo, // Desayuno, comida, cena, colación1, colación2
                    fecha: req.body.fecha,
                    lugar: req.body.lugar,
                    menuPreparacion: req.body.menuPreparacion,
                },
            ];

            registro = registro[0].save();

            if (!registro)
                return res
                    .status(500)
                    .json({ error: 'Error al guardar el registro' });
            res.status(200).send('Registro creado');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('modificarAlimento', async (req, res) => {
    try {
        let registro = await buscarRegistroDietetico(req.query.usuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
