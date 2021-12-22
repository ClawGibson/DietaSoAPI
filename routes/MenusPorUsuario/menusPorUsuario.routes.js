const MenusPorUsuario = require('../../models/MenusPorUsuario/MenusPorUsuario');
const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const { usuario, dia, categoria } = req.query;

        const registro = await MenusPorUsuario.find({
            usuario: mongoose.Types.ObjectId(usuario),
            dia: dia,
            categoria: categoria,
        })
            .populate('menu usuario')
            .select('-contrasena');

        if (!registro)
            return res.status(204).send({
                message: 'No se encontró el registro',
            });

        res.status(200).send(registro);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        const menusPorUsuario = await MenusPorUsuario.find()
            .populate('menu usuario')
            .select('-contrasena');

        if (!menusPorUsuario || menusPorUsuario.length === 0)
            return res.status(204).send({
                message: 'No se encontraron menus por usuario',
            });

        res.status(200).send(menusPorUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const registro = await MenusPorUsuario.find({
            usuario: mongoose.Types.ObjectId(id),
        })
            .populate('menu usuario')
            .select('-contrasena');

        if (!registro)
            return res.status(204).send({
                message: 'No se encontró el registro',
            });

        res.status(200).send(registro);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { usuario, menus, dia, hora, categoria } = req.body;

        let menusPorUsuario = new MenusPorUsuario({
            usuario: mongoose.Types.ObjectId(usuario),
            menu: mongoose.Types.ObjectId(menus),
            categoria: categoria,
            hora: hora,
            dia: dia,
        });
        menusPorUsuario = await menusPorUsuario.save();

        if (!menusPorUsuario)
            return res.status(204).send({
                success: false,
                message: 'No se pudo crear el menu por usuario',
            });

        res.status(200).send(menusPorUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const registro = await MenusPorUsuario.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!registro)
            return res.status(400).send({
                success: false,
                message: 'No se pudo actualizar el registro',
            });

        res.status(200).send(registro);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

module.exports = router;
