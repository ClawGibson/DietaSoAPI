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

			if (!nuevaEquivalencia) {
				return res.status(500).send('Error al guardar la nueva equivalencia');
			}

			return res.status(200).send('Datos guardados exitosamente! :D');
		} catch (err) {
			return res
				.status(500)
				.send('Ocurrió un error al querer guardar los datos', err);
		}

		if (!nuevaEquivalencia)
			return res.status(400).send('No se pudo crear la equivalencia :c');
	} catch (err) {
		return res.status(500).send('Error inesperado - ', err);
	}
});

router.get('/', async (req, res) => {
	try {
		const listaEquivalencias = await Equivalencias.find();
		if (!listaEquivalencias) {
			return res.status(500).send('Error al obtener la lista de equivalencias');
		}
		return res.status(200).send(listaEquivalencias);
	} catch (err) {
		return res.status(500).send('Error inesperado - ', err);
	}
});

module.exports = router;
