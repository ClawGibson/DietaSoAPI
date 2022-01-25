const { response } = require('express');
const Recordatorio = require('../../models/Recordatorios/recordatorio');

const addReminder = async (req, res = response) => {
    try {
        let nuevoRecordatorio = new Recordatorio({
            usuarios: req.body.usuarios,
            metas: req.body.metas,
            titulo: req.body.titulo,
            mensaje: req.body.mensaje,
            categoria: req.body.categoria,
            //dias: req.body.dias,
            expoTokens: req.body.expoTokens,
            fecha: req.body.fecha,
            hora: req.body.hora,
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
        const recordatorios = await Recordatorio.find();
        return res.status(200).json(recordatorios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const getRemindersByUser = async (req, res = response) => {
    try {
        const recordatorios = await Recordatorio.find({ usuarios: req.query.id });
        if (recordatorios.length === 0) {
            return res.status(204).json({ msg: "No hay recordatorios" })
        }
        res.status(200).json(recordatorios);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

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

const updateRemindersAddUsersToConfirm = async (req, res = response) => {
    const { id } = req.body;
    const { usuario } = req.body;
    try {
        const update = await Recordatorio.findOne(
            {
                $and: [{ _id: id },
                { usuariosConfirmados: usuario }]
            }
        );
        console.log(update);
        if (update === null) {
            console.log("No se encontro")
            await Recordatorio.updateOne({ _id: id },
                { $push: { usuariosConfirmados: usuario } }
            )
            res.status(201).json({ msg: "El usuario es agregado por que no se encontraba asignado" })
        }
        else {
            res.status(200).json({ msg: "El usuario es encontrado no se ha agreado recordatorio" })
        }

    } catch (error) {
        res.status(500).json({ msg: "Ha ocurrido un error en el servidor" });
    }
}

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
    getRemindersByUser,
    updateRemindersAddUsersToConfirm
};
