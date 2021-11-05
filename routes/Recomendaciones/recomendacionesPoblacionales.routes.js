const Recomendaciones = require('../../models/Recomendaciones/RecomendacionesPoblacionales');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let recomendacion = await Recomendaciones.find({
            grupoId: req.body.grupoId.toString(),
        });

        recomendacion = await recomendacion.save();

        res.send(recomendacion);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al importar las recomendaciones poblacionales',
        });
    }
});

module.exports = router;
