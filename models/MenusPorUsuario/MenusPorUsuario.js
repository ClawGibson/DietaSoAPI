const { Schema, model } = require('mongoose');

const menusPorUsuarioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    menu: { type: Schema.Types.ObjectId, ref: 'MenusBase', required: true },
    categoria: { type: String, required: true },
    hora: { type: String, required: true },
    dia: { type: String, required: true },
});

module.exports = model('MenusPorUsuario', menusPorUsuarioSchema);
