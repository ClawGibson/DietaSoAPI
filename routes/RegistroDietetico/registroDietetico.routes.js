const RegistroDietetico = require('../../models/RegistroDietetico');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { buscarUsuario, buscarAlimento } = require('../../constants/index');

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

router.get('/detalles', async (req, res) => {
    try {
        const usuario = await buscarUsuario(req.query.usuario);

        if (!usuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const registrosDeUsuario = await RegistroDietetico.find({
            usuario: mongoose.Types.ObjectId(req.query.usuario),
        })
            .limit(10)
            .populate({
                path: 'alimentos usuario',
                select: 'nombre',
                populate: { path: 'idAlimento', select: 'nombreAlimento' },
            });

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
        let nuevoRegistroDietetico = new RegistroDietetico({
            ...req.body,
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

router.patch('/modificarRegistro', async (req, res) => {
    try {
        const usuario = await buscarUsuario(req.query.usuario);

        if (!usuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const existeAlimento = await buscarAlimento(req.body.idAlimento);

        if (!existeAlimento)
            return res.status(404).send({
                Error: 'No se encontró el alimento proporcionado',
            });

        let registro = await buscarRegistroDietetico(req.query.usuario);

        const registroAModificar = registro[0].alimentos.filter(
            (alimento) => alimento.idAlimento.toString() === req.body.idAlimento
        );

        if (registroAModificar.length > 0) {
            const index = registro[0].alimentos.indexOf(registroAModificar[0]);

            registroAModificar[0].alimentos = {
                idAlimento: registro[0].alimentos[index].idAlimento,
                cantidad: req.body.cantidad,
                tipo: req.body.tipo,
                fecha: req.body.fecha,
                lugar: req.body.lugar,
                menuPreparacion: req.body.menuPreparacion,
                imagen: req.body.imagen,
            };

            registro[0].alimentos[index] = registroAModificar[0].alimentos;

            registro = registro[0].save();

            if (!registro)
                return res
                    .status(500)
                    .json({ error: 'Error al guardar el registro' });
            res.status(200).send('Actualizado');
        } else {
            registro[0].alimentos = [
                ...registro[0].alimentos,
                {
                    idAlimento: req.body.idAlimento,
                    cantidad: req.body.cantidad,
                    tipo: req.body.tipo, // Desayuno, comida, cena, colación1, colación2
                    fecha: req.body.fecha,
                    lugar: req.body.lugar,
                    menuPreparacion: req.body.menuPreparacion,
                    imagen: req.body.imagen,
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
        return res
            .status(500)
            .json({ message: 'Algo salió mal', error: error.message });
    }
});

router.patch('/eliminarAlimentoDeRegistro', async (req, res) => {
    try {
        const usuario = await buscarUsuario(req.query.usuario);

        if (!usuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const existeAlimento = await buscarAlimento(req.body.idAlimento);

        if (!existeAlimento)
            return res.status(404).send({
                Error: 'No se encontró el alimento proporcionado',
            });

        let registro = await buscarRegistroDietetico(req.query.usuario);

        registro[0].alimentos = registro[0].alimentos.filter(
            (alimento) => alimento.idAlimento.toString() !== req.body.idAlimento
        );

        registro = registro[0].save();

        if (!registro)
            return res
                .status(500)
                .json({ error: 'Error al eliminar el alimento del registro' });
        res.status(200).send('Alimento eliminado exitosamente');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
