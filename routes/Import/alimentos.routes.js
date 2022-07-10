const Alimentos = require('../../models/Alimentos');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const alimento = await Alimentos.find({
            sku: req.body.sku.toString(),
        });

        if (alimento.length === 0) {
            let nuevoAlimento = new Alimentos({ ...req.body });

            try {
                nuevoAlimento = await nuevoAlimento.save();

                if (!nuevoAlimento) {
                    return res.status(500).send('No se guardó el alimento');
                }

                return res.status(200).send(nuevoAlimento);
            } catch (error) {
                return res
                    .status(500)
                    .send(`Ocurrió un error al guardar los alimentos ${error}`);
            }
        }
        return res.status(200).json({ message: 'El alimento ya existe' });
    } catch (error) {
        return res.status(500).json(`Error inesperado al importar los alimentos - ${error}`);
    }
});

router.patch('/', async (req, res) => {
    let alimento;
    try {
        alimento = await Alimentos.findOneAndUpdate(
            { sku: req.body.sku.toString() },
            { ...req.body }
        );

        alimento = alimento
            .save()
            .then((response) => res.status(200).json({ message: 'Alimento actualizado' }))
            .catch((err) =>
                res.status(500).json({
                    success: false,
                    message: 'No se pudo actualizar el alimento - ',
                    err,
                })
            );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar los datos de alimentos - ',
            error,
        });
    }
});

module.exports = router;
