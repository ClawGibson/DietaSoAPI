const express = require('express');
const {
    agregarLike,
    obtenerLikes,
    obtenerLikesPorPublicacion,
    obetenerLikePorUsuario,
    eliminarLike,
} = require('../Likes/controller');
const router = express.Router();

router.post('/', agregarLike);
router.get('/', obtenerLikes);
router.get('/publicacion', obtenerLikesPorPublicacion);
router.get('/publicacionReaccionoUsuario', obetenerLikePorUsuario);
router.delete('/publicacion', eliminarLike);

module.exports = router;
