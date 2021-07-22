const Equivalencias = require('../../models/Equivalencias');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		let nuevaEquivalencia = new Equivalencias({
			alimento: req.body.alimento,
			cantidadSugerida: req.body.cantidadSugerida,
			unidad: req.body.unidad,
			pesoNetoKg: req.body.pesoNeto
		});

		try {
			nuevaEquivalencia = await nuevaEquivalencia.save();
		} catch (err) {
			console.log('Ocurrió un error al querer guardar los datos', err);
		}

		if (!nuevaEquivalencia)
			return res.status(400).send('No se pudo crear la equivalencia :c');
	} catch (err) {
		console.log('Ocurrió un error al intentar cargar los datos de Excel.', err);
	}
	return res.status(200).send('Datos guardados exitosamente! :D');
});

module.exports = router;
