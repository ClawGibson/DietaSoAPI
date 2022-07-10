const GrupoAlimento = require('../models/GrupoAlimentos');
const Alimentos = require('../models/Alimentos');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/all/', async (req, res) => {
    try {
        const alimentosLista = await Alimentos.find().select(
            'id nombreAlimento imagen grupoAlimento nivelPiramide'
        );

        if (!alimentosLista) return res.status(500).json({ success: false });

        res.send(alimentosLista);
    } catch (error) {
        console.log('Error al obtener los alimentos', error);
        res.status(500).send({
            message: 'Error al obtener los alimentos',
            error: error,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const alimento = await Alimentos.findById(req.params.id);

        if (!alimento)
            return res.status(204).send({
                message: 'No existe ese alimento :/',
            });

        res.send(alimento);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({
            message: 'Ocurrió un error',
            error: error,
        });
    }
});

router.get('/obtenerUltimo/valor', async (req, res) => {
    try {
        const sku = await Alimentos.find().count();

        if (!sku) {
            return res.status(204).send({
                message: 'No se encontraron sku',
            });
        }

        res.status(200).send({ sku: sku });
    } catch (error) {
        console.log('Error al obtener el sku máximo');
        res.status(500).send({
            message: 'Error al obtener el sku máximo',
            error: error,
        });
    }
});

router.get('/buscarNombre', async (req, res) => {
    try {
        //const { alimento } = req.;
        console.log(req.query);
        res.status(200);
        return;
        /* console.log('============================', alimento);
        const resultado = await Alimentos.find({
            nombreAlimento: { $regex: alimento },
        });
        console.log('RESULTADO ->>>>>>>>>>>', resultado);
        if (!resultado) {
            return res.status(204).send({
                message: 'No existe ese alimento :/',
            });
        }

        res.status(200).send(resultado); */
    } catch (err) {
        console.log('Error al obtener el alimento por nombre', err);
        res.status(500).send({
            message: 'Error al obtener el alimento por nombre',
            error: err,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { page, limit = 16 } = req.query;

        const options = {
            page,
            limit,
            select: 'nombreAlimento imagen grupoAlimento nivelPiramide',
            sort: { nombreAlimento: 'asc' },
        };

        const alimentos = await Alimentos.paginate({}, options);

        if (!alimentos)
            res.status(204).json({
                message: 'No hay alimentos todavía :c',
            });

        res.status(200).send(alimentos.docs);
    } catch (error) {
        console.log('Error al otener los alimentos', error);
        return res.status(500).send({
            message: 'Error al otener los alimentos',
            error: error,
        });
    }
});

router.get('/piramide/nivel', async (req, res) => {
    try {
        const { nivel } = req.query;

        const food = await Alimentos.find({ nivelPiramide: nivel }).select(
            'id nombreAlimento imagen'
        );

        if (!food) return res.status(500).json({ success: false });

        res.status(200).send(food);
    } catch (error) {
        console.log('Error al otener los alimentos', error);
        return res.status(500).send({
            message: 'Error al otener los alimentos',
            error: error,
        });
    }
});

router.get('/grupo/nombreGrupo', async (req, res) => {
    try {
        const { nombreGrupo } = req.query;

        const options = {
            limit: 999,
            select: 'nombreAlimento imagen grupoAlimento',
            sort: { nombreAlimento: 'asc' },
        };

        const alimentos = await Alimentos.paginate({ grupoAlimento: nombreGrupo }, options);

        if (!alimentos)
            return res.status(204).send({
                message: 'No existe ese grupo :/',
            });

        res.status(200).send(alimentos.docs);
    } catch (error) {
        console.log('Error al otener el grupo de alimentos', error);
        return res.status(500).send({
            message: 'Error al otener el grupo de alimentos',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const grupoAlimento = await GrupoAlimento.find({
            grupoDeAlimento: req.body.grupoAlimento,
        });

        if (!grupoAlimento) return res.status(400).send('Grupo de alimento inválido');

        let alimento = new Alimentos({ ...req.body });

        alimento = await alimento.save();

        if (!alimento) return res.status(400).send('No se pudo crear el alimento :c');

        res.status(200).send(alimento);
    } catch (error) {
        console.log('Error al crear el alimento', error);
        res.status(500).send({
            message: 'Error al crear el alimento',
            error: error,
        });
    }
});

router.patch('/:id', async (req, res) => {
    const ID = req.params.id;

    try {
        const alimentoEditar = await Alimentos.findByIdAndUpdate(
            ID,
            { ...req.body },
            { new: true }
        );

        if (!alimentoEditar)
            return res.status(204).send({
                message: 'El producto no se encontró o no se pudo editar :c',
            });

        res.status(200).send(alimentoEditar);
    } catch (error) {
        console.log('Error al actualizar el alimento', error);
        res.status(500).send({
            message: 'Error al actualizar el alimento',
            error: error,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(204).send({ message: 'El ID del alimento no es válido.' });

        const alimento = await Alimentos.findByIdAndRemove(req.params.id);

        if (!alimento)
            return res.status(404).send('No se encontró el alimento a eliminar :c');

        res.status(200).send('Alimento eliminado :D!');
    } catch (error) {
        console.log('Error al eliminar el alimento', error);
        res.status(500).send({
            message: 'Error al eliminar el alimento',
            error: error,
        });
    }
});

module.exports = router;
