const Recomendaciones = require('../../models/Recomendaciones/RecomendacionesPoblacionales');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        console.log('csomethings');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al importar las recomendaciones poblacionales',
        });
    }
});

module.exports = router;
