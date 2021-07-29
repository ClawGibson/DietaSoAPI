const EstadisticasIMC = require('../../models/Estadisticas/EstadisticasIMC');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await EstadisticasIMC.find();

    if (response.length === 0)
      return res
        .status(404)
        .send({ success: false, message: 'No se encontraron datos' });

    return res.status(200).send(response);
  } catch (e) {
    return res
      .status(500)
      .send('Error inesperado al obtener las estadisticas IMC - ', e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await EstadisticasIMC.find({
      usuario: req.params.id,
    }).populate('usuario', { nombre: 1, email: 1 });
    if (!response)
      return res
        .status(500)
        .send({ success: false, message: 'No se encontraron datos' });

    return res.status(200).send(response);
  } catch (e) {
    return res
      .status(500)
      .send('Error inesperado al obtener la estadistica IMC - ', e);
  }
});

router.post('/', async (req, res) => {
  try {
    let estadisticaIMC = new EstadisticasIMC({
      usuario: req.body.usuario,
      porcentajeGrasaCorporal: req.body.porcentajeGrasaCorporal,
      porcentajeMasaMuscular: req.body.porcentajeMasaMuscular,
    });

    estadisticaIMC = await estadisticaIMC.save();

    if (!estadisticaIMC)
      return res.status(500).send({
        success: false,
        message: 'Error al querer guardar la estadistica IMC',
      });

    return res.status(200).send(estadisticaIMC);
  } catch (e) {
    return res
      .status(500)
      .send('Error inesperado al crear la estadistica IMC - ', e);
  }
});

module.exports = router;
