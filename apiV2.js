/** @format */

const { Router } = require('express');
const router = Router();

const {
    grupoAlimentosRoute,
    alimentosRoute,
    subGrupoAlimentosRoute,
    recetasRoute,
    usuariosRoute,
    menusBaseRoute,
    logrosRoute,
    logrosDeUsuarioRoute,
    puntosDeUsuarioRoute,
    equivalenciasRoute,
    informacionUsuariosRoute,
    datosUsuarioRoute,
    historialClinicoRoute,
    datosSocioeconomicosRoute,
    alimentacionUsuariosRoute,
    estadisticasIMCRoute,
    estadisticasNivelesRoute,
    estadisticasPresionRoute,
    registroDieteticoRoute,
    importarAlimentosRoute,
} = require('./routes/index');

const { API_URL } = process.env;

router.use(`${API_URL}/alimentos`, alimentosRoute);
router.use(`${API_URL}/grupoAlimentos`, grupoAlimentosRoute);
router.use(`${API_URL}/subGrupoAlimentos`, subGrupoAlimentosRoute);
router.use(`${API_URL}/recetas`, recetasRoute);
router.use(`${API_URL}/usuarios`, usuariosRoute);
router.use(`${API_URL}/menusBase`, menusBaseRoute);
router.use(`${API_URL}/logros`, logrosRoute);
router.use(`${API_URL}/logrosDeUsuario`, logrosDeUsuarioRoute);
router.use(`${API_URL}/puntosDeUsuario`, puntosDeUsuarioRoute);
router.use(`${API_URL}/equivalencias`, equivalenciasRoute);
router.use(`${API_URL}/informacionUsuarios`, informacionUsuariosRoute);
router.use(`${API_URL}/datosUsuarios`, datosUsuarioRoute);
router.use(`${API_URL}/historialClinico`, historialClinicoRoute);
router.use(`${API_URL}/datosSocioeconomicos`, datosSocioeconomicosRoute);
router.use(`${API_URL}/alimentacionUsuarios`, alimentacionUsuariosRoute);
router.use(`${API_URL}/estadisticasIMC`, estadisticasIMCRoute);
router.use(`${API_URL}/estadisticasNiveles`, estadisticasNivelesRoute);
router.use(`${API_URL}/estadisticasPresion`, estadisticasPresionRoute);
router.use(`${API_URL}/registroDietetico`, registroDieteticoRoute);
router.use(`${API_URL}/importarAlimentos`, importarAlimentosRoute);

module.exports = {
    router,
};
