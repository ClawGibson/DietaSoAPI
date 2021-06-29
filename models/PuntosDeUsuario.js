const { Schema, model } = require('mongoose');

const puntosDeUsuario = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
  puntos: { type: Number, required: true },
});

puntosDeUsuario.virtual('id').get(function () {
  return this._id.toHexString();
});

puntosDeUsuario.set('toJSON', {
  virtuals: true,
});

module.exports = model('PuntosDeUsuario', puntosDeUsuario);
