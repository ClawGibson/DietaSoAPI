const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;
const API_URL = process.env.API_URL;

function authJwt() {
    return expressJwt({
        secret: SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            `${API_URL}/usuarios/login`,
            `${API_URL}/usuarios/register`,
            `${API_URL}/historialClinico/individual`,
            `${API_URL}/historialClinico/individual/`,
            `${API_URL}/historialClinico/individual/:id`,
            `${API_URL}/informacionUsuarios`,
            `${API_URL}/informacionUsuarios/`,
            `${API_URL}/informacionUsuarios/individual`,
            `${API_URL}/informacionUsuarios/individual/`,
            `${API_URL}/informacionUsuarios/individual/:id`,
            `${API_URL}/datosUsuarios/`,
            `${API_URL}/datosUsuarios/:id`,
            `${API_URL}/datosUsuarios/individual`,
            `${API_URL}/datosUsuarios/individual/`,
            `${API_URL}/datosUsuarios/individual/:id`,
            `${API_URL}/datosSocioeconomicos/`,
            `${API_URL}/datosSocioeconomicos/:id`,
            `${API_URL}/datosSocioeconomicos/individual`,
            `${API_URL}/datosSocioeconomicos/individual/`,
            `${API_URL}/datosSocioeconomicos/individual/:id`,
            `${API_URL}/alimentacionUsuarios`,
            `${API_URL}/alimentacionUsuarios/`,
            `${API_URL}/alimentacionUsuarios/:id`,
            `${API_URL}/alimentacionUsuarios/individual`,
            `${API_URL}/alimentacionUsuarios/individual/`,
            `${API_URL}/alimentacionUsuarios/individual/:id`,
            `${API_URL}/registroDietetico/`,
            `${API_URL}/foro/`,
            `${API_URL}/registroDietetico`,
            `${API_URL}/mensajes/`,
            `${API_URL}/mensajes/:id`,
            `${API_URL}/chat`,
            `${API_URL}/ejercicios`,
            `${API_URL}/pushToken`,
            `${API_URL}/foro`,
            `${API_URL}/pushToken/varios`,
            `${API_URL}/pushToken/actualizarToken`,
            `${API_URL}/like`,
            `${API_URL}/like/publicacion`,
            `${API_URL}/like/publicacionReaccionoUsuario`,
            `${API_URL}/recordatorios`,
            `${API_URL}/recordatorios/:id`,
            `${API_URL}/recordatorios/usuario`,
            `${API_URL}/menusPorUsuario`,
            `${API_URL}/menusPorUsuario/:id`,
            `${API_URL}/menusPorUsuario/:userId`,
            `${API_URL}/planAlimenticio`,
            `${API_URL}/planAlimenticio/:id`,
            `${API_URL}/opcionesRegistro`,
            `${API_URL}/puntosDeUsuario/:id`,
            `${API_URL}/estadisticasPresion/`,
            `${API_URL}/estadisticasNiveles/`,
            `${API_URL}/estadisticasIMC/`,
            `${API_URL}/logrosDeUsuario/`,
            `${API_URL}/usoAplicacion`,
            `${API_URL}/usoAplicacion/`,
            `${API_URL}/usoAplicacion/individual`,
            `${API_URL}/alimentos/grupo/nombreGrupo`,
            `${API_URL}/recordatorios/usuario`,
            `${API_URL}/recordatorios/usuario/`,
            `${API_URL}/recordatorios/usuario/:id`,
            { url: `${API_URL}/alimentos`, methods: ['GET'] },
            { url: `${API_URL}/grupoAlimentos`, methods: ['GET'] },
            { url: `${API_URL}/recetas`, methods: ['GET'] },
            { url: `${API_URL}/logros`, methods: ['GET'] },
            { url: `${API_URL}/equivalencias/`, methods: ['GET'] },
            {
                url: `${API_URL}/subGrupoAlimentos`,
                methods: ['GET'],
            },
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!req.headers.authorization) return done(null, false);
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return done(null, false);
        if (req.method !== 'GET') {
            if (!payload.isAdmin) {
                return done(null, false);
            }
            done();
        }
        done();
    });
    done();
}

module.exports = authJwt;
