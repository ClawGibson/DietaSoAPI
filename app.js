/** @format */

require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
    metas,
    recordatorios,
    mensajes,
    chat,
    foro,
} = require('./routes/index');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const { API_URL, PORT, MONGODB, DBNAME } = process.env;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// routes
app.use(`${API_URL}/alimentos`, alimentosRoute);
app.use(`${API_URL}/grupoAlimentos`, grupoAlimentosRoute);
app.use(`${API_URL}/subGrupoAlimentos`, subGrupoAlimentosRoute);
app.use(`${API_URL}/recetas`, recetasRoute);
app.use(`${API_URL}/usuarios`, usuariosRoute);
app.use(`${API_URL}/menusBase`, menusBaseRoute);
app.use(`${API_URL}/logros`, logrosRoute);
app.use(`${API_URL}/logrosDeUsuario`, logrosDeUsuarioRoute);
app.use(`${API_URL}/puntosDeUsuario`, puntosDeUsuarioRoute);
app.use(`${API_URL}/equivalencias`, equivalenciasRoute);
app.use(`${API_URL}/informacionUsuarios`, informacionUsuariosRoute);
app.use(`${API_URL}/datosUsuarios`, datosUsuarioRoute);
app.use(`${API_URL}/historialClinico`, historialClinicoRoute);
app.use(`${API_URL}/datosSocioeconomicos`, datosSocioeconomicosRoute);
app.use(`${API_URL}/alimentacionUsuarios`, alimentacionUsuariosRoute);
app.use(`${API_URL}/estadisticasIMC`, estadisticasIMCRoute);
app.use(`${API_URL}/estadisticasNiveles`, estadisticasNivelesRoute);
app.use(`${API_URL}/estadisticasPresion`, estadisticasPresionRoute);
app.use(`${API_URL}/registroDietetico`, registroDieteticoRoute);
app.use(`${API_URL}/metas`, metas);
app.use(`${API_URL}/recordatorios`, recordatorios);
app.use(`${API_URL}/mensajes`, mensajes);
app.use(`${API_URL}/chat`, chat);
app.use(`${API_URL}/foro`, foro);

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: DBNAME,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(`Succefully connected to database ${DBNAME}`);
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT || 4000, () => {
    console.log(`Server running at ${process.env.port || 4000}`);
});
