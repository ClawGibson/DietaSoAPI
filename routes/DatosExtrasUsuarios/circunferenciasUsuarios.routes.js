const Usuarios = require('../../models/Usuarios');
const CircunferenciasUsuarios = require('../../models/DatosExtrasUsuarios/CircunferenciasUsuarios');
const express = require('express');
const router = express.Router();

const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await CircunferenciasUsuarios.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de circunferencias de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const usuarioCreado = await buscarUsuario(req.query.usuario);
        console.log(usuarioCreado);

        if (!usuarioCreado) {
            return res.status(500).json({
                success: false,
                message: 'El usuario no existe',
            });
        } else console.log('El usuario existe');

        try {
            const datosDeUsuario = await CircunferenciasUsuarios.findOne({
                usuario: req.query.usuario,
            });
            console.log(datosDeUsuario);
            if (!datosDeUsuario)
                return res.status(500).json({
                    success: true,
                    message:
                        'El usuario no tiene datos de circunferencias todavia',
                });

            res.send(datosDeUsuario);
        } catch (err) {
            return res.status(500).json({
                success: true,
                message:
                    'Ocurrio un error al guardar los datos de circunferencias',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al buscar usuario',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await CircunferenciasUsuarios.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message:
                            'Datos de circunferencias de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos de circunferencias del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dCircunferencias = new CircunferenciasUsuarios({
        usuario: req.query.usuario,
        cintura: req.body.cintura,
        cadera: req.body.cadera,
    });

    try {
        dCircunferencias = await dCircunferencias.save();

        if (!dCircunferencias)
            return res
                .status(400)
                .send('No se pudieron agregar datos de circunferencias');
        res.send(dCircunferencias);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos de circunferencias',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const existeUsuario = await buscarUsuario(req.params.usuario);
        let editarInformacionS;
        if (!existeUsuario)
            return res
                .status(500)
                .json({ success: false, message: 'El usuario no existe.' });

        try {
            editarInformacionS = await CircunferenciasUsuarios.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    cintura: req.body.cintura,
                    cadera: req.body.cadera,
                }
            );

            editarInformacionS = editarInformacionS
                .save()
                .then((response) => res.status(200).json({ message: 'ok' }))
                .catch((err) =>
                    res.status(500).json({
                        success: false,
                        message: 'No se pudo guardar - ',
                        err,
                    })
                );
        } catch (err) {
            res.status(500).json({
                success: false,
                message:
                    ' Ocurrió un error al actualizar los datos de circunferencias- ',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: ' Ocurrió un error al buscar el usuario- ',
        });
    }
});

module.exports = router;
