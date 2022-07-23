const Usuarios = require('../../models/Usuarios');
const IndicadoresClinicos = require('../../models/DatosExtrasUsuarios/IndicadoresClinicos');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const listaDSUsuarios = await IndicadoresClinicos.find();

    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        const datosDeUsuario = await IndicadoresClinicos.find({
            usuario: usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de indicadores clinicos todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de indicadores clinicos',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await IndicadoresClinicos.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message: 'Datos de indicadores clinicos de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos de indicadores clinicos del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dIndicadoresC = new IndicadoresClinicos({ ...req.body });

    try {
        dIndicadoresC = await dIndicadoresC.save();

        if (!dIndicadoresC)
            return res
                .status(400)
                .send('No se pudieron agregar datos de indicadores clinicos');
        res.status(200).send(dIndicadoresC);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de indicadores clinicos',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const {
            usuario,
            presionArterialSistolica,
            presionArterialDiastolica,
            acantosisNigricans,
        } = req.body;

        let clinicos = await IndicadoresClinicos.findOneAndUpdate(
            { usuario: usuario },
            {
                $push: {
                    presionArterialSistolica: presionArterialSistolica,
                    presionArterialDiastolica: presionArterialDiastolica,
                    acantosisNigricans: acantosisNigricans,
                },
            }
        );

        clinicos = await clinicos.save();

        if (!clinicos) {
            return res.status(500).send({
                success: false,
                message: 'No se pudo guardar los datos de indicadores clinicos',
            });
        }

        res.status(200).send(clinicos);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: ' Ocurrió un error al actualizar los datos de indicadores clinicos- ',
            err,
        });
    }
});

module.exports = router;
