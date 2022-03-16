const OpcionesEdicion = require('../../models/DetallesUsuarios/DetallesUsuarios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const opciones = await OpcionesEdicion.find();

        if (!opciones || opciones.length === 0)
            return res.status(204).send({
                message: 'No se encontraron opciones de edición',
            });

        res.status(200).send(opciones);
    } catch (error) {
        console.log('Error al obtener las opciones de registro', error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
     }
 });

module.exports = router;