const excelToJson = require('convert-excel-to-json');
const Equivalencias = require('../../models/Equivalencias');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  let resultsFromExcel;

  try {
    const excelData = excelToJson({
      sourceFile: req.body.sourceFile,
      sheets: [
        {
          name: 'Hoja1',
          header: {
            rows: 1,
          },
          columnToKey: {
            A: 'alimento',
            B: 'cantidadSugerida',
            C: 'unidad',
            D: 'pesoNeto',
          },
        },
      ],
    });

    resultsFromExcel = [];
    Object.values(excelData).map((item) =>
      Object.values(item).map((index) => resultsFromExcel.push(index))
    );
  } catch (err) {
    console.log('Error al leer el archivo :c', err);
  }

  try {
    resultsFromExcel.map(async (item) => {
      if (!item.cantidadSugerida || !item.unidad)
        return res.status(200).send('Datos guardados con éxito');

      let nuevaEquivalencia = new Equivalencias({
        alimento: item.alimento,
        cantidadSugerida: item.cantidadSugerida,
        unidad: item.unidad,
        pesoNetoKg: item.pesoNeto,
      });

      try {
        nuevaEquivalencia = await nuevaEquivalencia.save();
      } catch (err) {
        console.log('Ocurrió un error al querer guardar los datos', err);
      }

      if (!nuevaEquivalencia)
        return res.status(400).send('No se pudo crear la equivalencia :c');
    });
  } catch (err) {
    console.log('Ocurrió un error al intentar cargar los datos de Excel.', err);
  }
});

module.exports = router;
