const Alimentos = require('../../models/Alimentos');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
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
                .send('Ocurrió un error al guardar los alimentos', err);
        }
    } catch (error) {
        return res
            .status(500)
            .send('Error inesperado al importar los alimentos - ', err);
    }
});

module.exports = router;
