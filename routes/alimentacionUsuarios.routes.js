const Usuarios = require('../models/Usuarios');
const AlimentacionUsuarios = require('../models/AlimentacionUsuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    const listaAUsuarios = await AlimentacionUsuarios.find();

    if (listaAUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ningun registro de la alimentacion de usuarios',
        });
    res.send(listaAUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const usuario = await buscarUsuario(req.query.usuario);
        console.log(usuario);

        if (!usuario)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        try {
            const comidaFavorita = await AlimentacionUsuarios.findOne({
                usuario: req.query.usuario,
            }).select(
                'comidaFavorita comidaNoFavorita alergiasAlimentarias lugarDeCompras quienCocina estatusDieta extras desayuno colacion1 comida colacion2 cena desayunoAyer colacion1Ayer comidaAyer colacion2Ayer cenaAyer'
            );
            console.log(comidaFavorita);
            if (!comidaFavorita)
                return res.status(404).send({
                    message:
                        'El usuario no tiene información de alimentación registrada',
                });

            res.send(comidaFavorita);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message:
                    'Ocurrió un error al buscar la informacion de alimentacion',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await buscarUsuario(req.query.usuario);
        if (usuarioCreado) {
            try {
                const infoUsuario = await AlimentacionUsuarios.findOne({
                    usuario: req.query.usuario,
                });

                if (infoUsuario)
                    return res.status(204).json({
                        success: false,
                        message: 'Alimentacion de Usuario ya registrada',
                    });
            } catch (err) {
                console.log(
                    'Ocurrió un error al buscar la alimentación de usuarios - ',
                    err
                );
                return res.status(204).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar la alimentación del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        console.log('Ocurrió un error al buscar el usuario - ', err);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }
    let aUsuarios = new AlimentacionUsuarios({
        usuario: req.query.usuario,
        ...req.body,
    });

    try {
        aUsuarios = await aUsuarios.save();

        if (!aUsuarios)
            return res
                .status(400)
                .send(
                    'No se pudo agregar los datos de alimentacion de usuarios'
                );
        res.send(aUsuarios);
    } catch (err) {
        console.log(
            'Ocurrió un error al guardar los datos de alimentacion - ',
            err
        );
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al guardar los datos de alimentacion de usuarios -',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const existeUsuario = await buscarUsuario(req.query.usuario);

        if (!existeUsuario)
            return res
                .status(500)
                .json({ success: false, message: 'El usuario no existe.' });

        let editarInformacionA;
        try {
            editarInformacionA = await AlimentacionUsuarios.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    ...req.body,
                }
            );

            editarInformacionA = editarInformacionA
                .save()
                .then((response) => res.status(200).json({ message: 'ok' }))
                .catch((err) =>
                    res.status(500).json({
                        success: false,
                        message: 'No se pudo guardar la alimentación - ',
                        err,
                    })
                );
        } catch (err) {
            console.log('Error: ', err);
            res.status(500).json({
                success: false,
                message:
                    'Ocurrió un error al actualizar los datos de alimentos - ',
                err,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario - ',
            err,
        });
    }
});

router.patch('/comidaFav/', async (req, res) => {
    const usuarioCreado = await Usuarios.findOne({
        usuario: req.query.usuario,
    });
    try {
        if (usuarioCreado) {
            const comidaFav = await AlimentacionUsuarios.findOne({
                usuario: req.query.usuario,
                comidaFavorita: req.body.comidaFavorita,
            });
            //console.log(usuarioCreado);
            try {
                console.log(comidaFav); //devuelve null si no existe
                if (comidaFav)
                    return res.status(500).json({
                        success: false,
                        message: 'Esa comida ya esta registrada',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Ocurrió un error al buscar la comida ',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario ',
        });
    }

    var nuevaComidaFav = { comidaFavorita: req.body.comidaFavorita };
    console.log(nuevaComidaFav.comidaFavorita);
    AlimentacionUsuarios.findOneAndUpdate(
        { usuario: req.query.usuario },
        { $push: { comidaFavorita: nuevaComidaFav.comidaFavorita } },
        function (error, success) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Comida ya esta registrada',
                });
            } else {
                //console.log(success);
                res.send('ok');
            }
        }
    );
});

router.get('/comidaFav/', async (req, res) => {
    try {
        const comidaFavorita = await AlimentacionUsuarios.find({
            usuario: req.query.usuario,
        }).select('comidaFavorita');

        if (!comidaFavorita.length > 0)
            return res.status(500).json({
                success: true,
                message: 'El usuario no tiene informacion de su alimentacion',
            });

        res.send(comidaFavorita[0]);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message:
                'Ocurrió un error al obtener la informacion de alimentacionn',
        });
    }
});

router.delete('/comidaFav/', async (req, res) => {
    const usuarioCreado = await Usuarios.findOne({
        usuario: req.query.usuario,
    });
    try {
        if (usuarioCreado) {
            const comidaFav = await AlimentacionUsuarios.findOne({
                usuario: req.query.usuario,
                comidaFavorita: req.body.comidaFavorita,
            });
            //console.log(usuarioCreado);
            try {
                //console.log(comidaFav);
                if (!comidaFav)
                    return res.status(500).json({
                        success: false,
                        message: 'Esa comida no existe',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Ocurrió un error al buscar la comida',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }

    var nuevaComidaFav = { comidaFavorita: req.body.comidaFavorita };
    //console.log(nuevaComidaFav.comidaFavorita);
    AlimentacionUsuarios.findOneAndUpdate(
        { usuario: req.query.usuario },
        { $pull: { comidaFavorita: nuevaComidaFav.comidaFavorita } },
        function (error, success) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'error al eliminar la comida',
                });
            } else {
                //console.log(success);
                res.send('ok');
            }
        }
    );
});

module.exports = router;
