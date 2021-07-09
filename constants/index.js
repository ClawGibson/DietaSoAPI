const Usuarios = require('../models/Usuarios');

export const buscarUsuario = async (id) => {
  try {
    const existeUsuario = await Usuarios.findById(id);

    if (!existeUsuario)
      return res
        .status(500)
        .json({ success: false, message: 'El usuario no existe.' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el usuario - ', err);
  }
};
