const { response } = require('express');
const Recordatorio = require('../../models/Recordatorios/recordatorio');

const addReminder = async (req, res = response) => {
    try {
        /* let nuevoRecordatorio = new Recordatorio({
            usuarios: req.body.usuarios,
            metas: req.body.metas,
            titulo: req.body.titulo,
            mensaje: req.body.mensaje,
            categoria: req.body.categoria,
            //dias: req.body.dias,
            expoTokens: req.body.expoTokens,
            fecha: req.body.fecha,
            hora: req.body.hora,
        }); */

        let nuevoRecordatorio = new Recordatorio({ ...req.body });
        nuevoRecordatorio = await nuevoRecordatorio.save();
        if (!nuevoRecordatorio) {
            return res
                .status(400)
                .send({ message: 'No se pudo crear el nuevo recordatorio' });
        }
        res.status(200).send(nuevoRecordatorio);
    } catch (error) {
        console.log('Error al crear el recordatorio', error);
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
        const recordatorios = await Recordatorio.find({
            usuarios: req.query.id,
        });
        if (recordatorios.length === 0) {
            return res.status(204).json({ msg: 'No hay recordatorios' });
        }
        res.status(200).json(recordatorios);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
// Permitir la edición del recordatorio, no solo para agregar nuevos usuarios.
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
        const update = await Recordatorio.findOne({
            $and: [{ _id: id }, { usuariosConfirmados: usuario }],
        });
        if (update === null) {
            await Recordatorio.updateOne(
                { _id: id },
                { $push: { usuariosConfirmados: usuario } }
            );
            res.status(201).json({
                msg: 'El usuario es agregado por que no se encontraba asignado',
            });
        } else {
            res.status(200).json({
                msg: 'El usuario es encontrado no se ha agreado recordatorio',
            });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Ha ocurrido un error en el servidor' });
    }
};

const updateReminder = async (req, res = response) => {
    try {
        const { id } = req.params;

        let update = await Recordatorio.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!update)
            res.status(204).send({
                message: 'No se pudo actualizar el recordatorio',
            });

        res.status(200).send(update);
    } catch (error) {
        console.log('Error al actualizar el recordatorio', error);
        res.status(500).send({ msg: 'No se pudo actualizar', error: error });
    }
};

const deleteReminder = async (req, res = response) => {
    try {
        const { id } = req.params;

        const reminder = await Recordatorio.findByIdAndRemove({ id });

        if (!reminder)
            res.status(204).send({
                message: 'No se pudo eliminar el recordatorio',
            });

        res.status(200).send(reminder);
    } catch (error) {
        console.log('Error al eliminar el recordatorio', error);
        return res.status(500).send({ error });
    }
};

module.exports = {
    addReminder,
    getReminders,
    updateRemindersAddUsers,
    deleteReminder,
    getRemindersByUser,
    updateRemindersAddUsersToConfirm,
    updateReminder,
};
