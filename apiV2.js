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
    estadisticasHuellaRoute,
    estadisticasConsumoRoute,
    registroDieteticoRoute,
    importarAlimentosRoute,
    recomendacionesPoblacionalesRoute,
    metas,
    recordatorios,
    mensajes,
    chat,
    foro,
    imagesRoute,
    ejerciciosRoute,
    puntosPorEjercicioRoute,
    pushToken,
    like,
    menusPorUsuarioRoute,
    planAlimenticioRoute,
    opcionesRegistro,
    pasosCompletados,
    videosRecetasRoute,
} = require('./routes/index');

const { API_URL } = process.env;

router.use(`${API_URL}/alimentos`, alimentosRoute);
router.use(`${API_URL}/grupoAlimentos`, grupoAlimentosRoute);
router.use(`${API_URL}/subGrupoAlimentos`, subGrupoAlimentosRoute);
router.use(`${API_URL}/recetas`, videosRecetasRoute);
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
router.use(`${API_URL}/estadisticasHuella`, estadisticasHuellaRoute);
router.use(`${API_URL}/estadisticasConsumo`, estadisticasConsumoRoute);
router.use(`${API_URL}/estadisticasPresion`, estadisticasPresionRoute);
router.use(`${API_URL}/registroDietetico`, registroDieteticoRoute);
router.use(`${API_URL}/importarAlimentos`, importarAlimentosRoute);
router.use(`${API_URL}/pushToken`, pushToken);
router.use(
    `${API_URL}/recomendacionPoblacional`,
    recomendacionesPoblacionalesRoute
);
router.use(`${API_URL}/metas`, metas);
router.use(`${API_URL}/recordatorios`, recordatorios);
router.use(`${API_URL}/mensajes`, mensajes);
router.use(`${API_URL}/chat`, chat);
router.use(`${API_URL}/foro`, foro);
router.use(`${API_URL}/images`, imagesRoute);
router.use(`${API_URL}/ejercicios`, ejerciciosRoute);
router.use(`${API_URL}/puntosPorEjercicio`, puntosPorEjercicioRoute);
router.use(`${API_URL}/like`, like);
router.use(`${API_URL}/menusPorUsuario`, menusPorUsuarioRoute);
router.use(`${API_URL}/planAlimenticio`, planAlimenticioRoute);
router.use(`${API_URL}/opcionesRegistro`, opcionesRegistro);
router.use(`${API_URL}/pasosCompletados`, pasosCompletados);

module.exports = {
    router,
};
