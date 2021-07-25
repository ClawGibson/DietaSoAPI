const EstadisticasPresion = require('../../models/Estadisticas/EstadisticasPresion');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await EstadisticasPresion.find();

    if (response.length === 0)
      return res
        .status(404)
        .send({ success: false, message: 'No se encontrados datos' });
  } catch (err) {
    return res
      .status(500)
      .send('Error inesperado al obtener las estadisticas de presión - ', err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const presion = await EstadisticasPresion.find({
      usuario: req.params.id,
    }).populate('usuario', { nombre: 1 });

    if (!presion)
      return status(404).send({
        success: false,
        message: 'No se encontrado datos',
      });
    return res.status(200).send(presion);
  } catch (err) {
    return res
      .status(500)
      .send('Error inesperado al obtener la estadistica de presión - ', err);
  }
});

router.post('/', async (req, res) => {
  try {
    let estadisticaPresion = new EstadisticasPresion(req.body);

    estadisticaPresion = await estadisticaPresion.save();

    if (!estadisticaPresion)
      return res.status(500).send({
        success: false,
        message: 'Error al guardar la estadistica de presión',
      });
    return res.status(200).send(estadisticaPresion);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Error inesperado al guardar la estadistica de presión - ',
      err,
    });
  }
});

module.exports = router;
