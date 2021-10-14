const { response } = require('express');
const Recordatorio = require('../../models/Recordatorios/recordatorio');

const addReminder = async (req, res = response) => {
    try {
        let nuevoRecordatorio = new Recordatorio({
            usuario: req.body.usuario,
            metas: req.body.metas,
            titulo: req.body.titulo,
            mensaje: req.body.mensaje,
            categoria: req.body.categoria,
            dias: req.body.dias,
        });
        nuevoRecordatorio = await nuevoRecordatorio.save();
        if (!nuevoRecordatorio) {
            return res
                .status(500)
                .send('No se pudo crear el nuevo recordatorio');
        }
        res.status(200).send('Se creo correctamente el recordatorio');
    } catch (error) {
        return res.status(500).send({ error });
    }
};

const getReminders = async (req, res = response) => {
    try {
        return await Recordatorio.find()
            .populate({ path: 'usuario', select: 'email' })
            .populate({ path: 'metas', select: 'objetivo descripcion' })
            .exec((e, populated) => {
                if (e) {
                    return e;
                }
                res.send(populated);
            });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateRemindersAddUsers = async (req, res = response) => {
    const { titulo } = req.query;
    const { usuario } = req.body;

    try {
        const update = await Recordatorio.findOneAndUpdate(
            { titulo },
            { $push: { usuario } }
        );

        res.send(update);
    } catch (error) {
        res.send(error);
    }
};

const deleteReminder = async (req, res = response) => {
    const { id } = req.query;
    const reminder = await Recordatorio.findOneAndDelete({ _id: id });
    res.json({ msg: `Recordatorio ${id} eliminado con exito` });
};

module.exports = {
    addReminder,
    getReminders,
    updateRemindersAddUsers,
    deleteReminder,
};
