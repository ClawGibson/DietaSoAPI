const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

function authJwt() {
    return expressJwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            `${process.env.API_URL}/usuarios/login`,
            `${process.env.API_URL}/usuarios/register`,
            `${process.env.API_URL}/historialClinico/individual`,
            `${process.env.API_URL}/historialClinico/individual/`,
            `${process.env.API_URL}/historialClinico/individual/:id`,
            `${process.env.API_URL}/informacionUsuarios`,
            `${process.env.API_URL}/informacionUsuarios/`,
            `${process.env.API_URL}/informacionUsuarios/individual`,
            `${process.env.API_URL}/informacionUsuarios/individual/`,
            `${process.env.API_URL}/informacionUsuarios/individual/:id`,
            `${process.env.API_URL}/datosUsuarios/`,
            `${process.env.API_URL}/datosUsuarios/:id`,
            `${process.env.API_URL}/datosUsuarios/individual`,
            `${process.env.API_URL}/datosUsuarios/individual/`,
            `${process.env.API_URL}/datosUsuarios/individual/:id`,
            `${process.env.API_URL}/datosSocioeconomicos/`,
            `${process.env.API_URL}/datosSocioeconomicos/:id`,
            `${process.env.API_URL}/datosSocioeconomicos/individual`,
            `${process.env.API_URL}/datosSocioeconomicos/individual/`,
            `${process.env.API_URL}/datosSocioeconomicos/individual/:id`,
            `${process.env.API_URL}/alimentacionUsuarios`,
            `${process.env.API_URL}/alimentacionUsuarios/`,
            `${process.env.API_URL}/alimentacionUsuarios/:id`,
            `${process.env.API_URL}/alimentacionUsuarios/individual`,
            `${process.env.API_URL}/alimentacionUsuarios/individual/`,
            `${process.env.API_URL}/alimentacionUsuarios/individual/:id`,
            `${process.env.API_URL}/registroDietetico/`,
            `${process.env.API_URL}/foro/`,
            `${process.env.API_URL}/registroDietetico`,
            `${process.env.API_URL}/mensajes/`,
            `${process.env.API_URL}/mensajes/:id`,
            `${process.env.API_URL}/chat`,
            `${process.env.API_URL}/ejercicios`,
            `${process.env.API_URL}/pushToken`,
            `${process.env.API_URL}/foro`,
            `${process.env.API_URL}/pushToken/varios`,
            `${process.env.API_URL}/pushToken/actualizarToken`,
            `${process.env.API_URL}/like`,
            `${process.env.API_URL}/like/publicacion`,
            `${process.env.API_URL}/like/publicacionReaccionoUsuario`,
            `${process.env.API_URL}/recordatorios`,
            `${process.env.API_URL}/recordatorios/usuario`,
            `${process.env.API_URL}/menusPorUsuario`,
            `${process.env.API_URL}/menusPorUsuario/:id`,
            `${process.env.API_URL}/menusPorUsuario/:userId`,
            `${process.env.API_URL}/planAlimenticio`,
            `${process.env.API_URL}/planAlimenticio/:id`,
            `${process.env.API_URL}/opcionesRegistro`,
            `${process.env.API_URL}/puntosDeUsuario/:id`,
            `${process.env.API_URL}/estadisticasPresion/`,
            `${process.env.API_URL}/estadisticasNiveles/`,
            `${process.env.API_URL}/estadisticasIMC/`,
            `${process.env.API_URL}/logrosDeUsuario/`,
            { url: `${process.env.API_URL}/alimentos`, methods: ['GET'] },
            { url: `${process.env.API_URL}/grupoAlimentos`, methods: ['GET'] },
            { url: `${process.env.API_URL}/recetas`, methods: ['GET'] },
            { url: `${process.env.API_URL}/logros`, methods: ['GET'] },
            { url: `${process.env.API_URL}/equivalencias/`, methods: ['GET'] },
            {
                url: `${process.env.API_URL}/subGrupoAlimentos`,
                methods: ['GET'],
            },
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!req.headers.authorization) return done(null, false);
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
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
