const express = require("express");
const router = express.Router();

const Metas = require("../../models/metas/Metas");

router.post("/", async (req, res) => {
    try {
        let nuevaMeta = new Metas({
            objetivo: req.body.objetivo,
            descripcion: req.body.descripcion,
            categoriaDeSostenibilidad: req.body.categoriaDeSostenibilidad,
        })
        nuevaMeta = await nuevaMeta.save();
        if (!nuevaMeta) {
            return res
                .status(500)
                .send("No se pudo crear la nueva meta");
        }
        res.status(200).send("Se creo correctamente la meta");
    }

    catch (error) {
        return res.status(500).json({ error });
    }
})


module.exports = router;
