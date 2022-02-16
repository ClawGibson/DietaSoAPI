const GrupoAlimento = require('../models/GrupoAlimentos');
const Alimentos = require('../models/Alimentos');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/all/', async (req, res) => {
    try {
        const alimentosLista = await Alimentos.find().select(
            'id nombreAlimento'
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

router.get('/sku', async (req, res) => {
    try {
        const sku = await Alimentos.find().sort({ nombreAlimento: 1 }).limit(1);

        if (!sku) {
            return res.status(204).send({
                message: 'No se encontraron sku',
            });
        }

        res.status(200).send(sku);
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
        const alimentos = await Alimentos.find().select(
            'nombreAlimento imagen grupoAlimento'
        );

        if (!alimentos)
            res.status(204).json({
                message: 'No hay alimentos todavía :c',
            });

        res.status(200).send(alimentos);
    } catch (error) {
        console.log('Error al otener los alimentos', error);
        return res.status(500).send({
            message: 'Error al otener los alimentos',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const grupoAlimento = await GrupoAlimento.find({
            grupoDeAlimento: req.body.grupoAlimento,
        });

        if (!grupoAlimento)
            return res.status(400).send('Grupo de alimento inválido');

        let alimento = new Alimentos({
            nombreAlimento: req.body.nombreAlimento,
            sku: req.body.sku,
            imagen: req.body.imagen,
            grupoExportable: req.body.grupoExportable,
            subGrupoExportable: req.body.subGrupoExportable,
            clasificacionExportable: req.body.clasificacionExportable,
            grupoAlimento: req.body.grupoAlimento,
            mensaje: req.body.mensaje,
            icono: req.body.icono,
            opcionesPreparacion: req.body.opcionesPreparacion,
            cantidadAlimento: req.body.cantidadAlimento,
            caloriasMacronutrientes: req.body.caloriasMacronutrientes,
            vitaminas: req.body.vitaminas,
            minerales: req.body.minerales,
            aspectoGlucemico: req.body.aspectoGlucemico,
            aspectoMedioambiental: req.body.aspectoMedioambiental,
            aspectoEconomico: req.body.aspectoEconomico,
            componentesBioactivos: req.body.componentesBioactivos,
            aditivosAlimentarios: req.body.aditivosAlimentarios,
            atributosAdicionales: req.body.atributosAdicionales,
            marca: req.body.marca,
            puntos: req.body.puntos,
        });

        alimento = await alimento.save();

        if (!alimento)
            return res.status(400).send('No se pudo crear el alimento :c');

        res.send(alimento);
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

    console.log('ID', ID);

    try {
        const alimentoEditar = await Alimentos.findByIdAndUpdate(
            ID,
            {
                ...req.body,
            },
            {
                new: true, // Return the new product.
            }
        );
        console.log('alimentoEditar', alimentoEditar);
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
            return res
                .status(204)
                .send({ message: 'El ID del alimento no es válido.' });

        const alimento = await Alimentos.findByIdAndRemove(req.params.id);

        if (!alimento)
            return res
                .status(404)
                .send('No se encontró el alimento a eliminar :c');

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
