const { response } = require("express");
const Metas = require("../../models/Metas/Metas");


const addGoal = async (req, res = response) => {
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
}


const getGoals = async (req, res) => {
    try {
        const respuesta = await Metas.find();
        if (!respuesta)
            return res
                .status(500)
                .send("No se encontraron metas");

        res.send(respuesta);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateGoal_All = async (req, res) => {
    const { id } = req.query;
    const { ...allData } = req.body;
    const goal = await Metas.findOneAndUpdate({ _id: id }, allData);
    res.send(goal);
}

const deleteGoal = async (req, res) => {
    const { id } = req.query;

    try {

        const goal = await Metas.findOneAndDelete({ _id: id });
        if (!goal) {
            return res.status(400).json({
                msg: "Meta no encontrada"
            })
        }
        return res.status(200).json({ msg: "Eliminado correctamente" })
    }
    catch (error) {
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


}
module.exports = {
    addGoal,
    getGoals,
    updateGoal_All,
    deleteGoal,
}