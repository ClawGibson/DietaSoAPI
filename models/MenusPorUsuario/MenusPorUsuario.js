const { Schema, model } = require('mongoose');

const menusPorUsuarioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    menu: { type: Schema.Types.ObjectId, ref: 'MenusBase', required: true },
    categoria: { type: String, required: true },
    hora: { type: String, required: true },
    dia: { type: String, required: true },
});

module.exports = model('MenusPorUsuario', menusPorUsuarioSchema);
//Ver si es necesario modificar este modelo para recibir más menús, es decir, un array oo....
// Crear una entidad diferente para almacenar todos estos menus para un solo usuario.
