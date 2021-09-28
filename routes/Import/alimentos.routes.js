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
        res.redirect('/actualizar');
    } catch (error) {
        return res
            .status(500)
            .json(`Error inesperado al importar los alimentos - ${error}`);
    }
});

router.patch('/actualizar', async (req, res) => {
    console.log('HOLAS', req.body);
});

module.exports = router;
