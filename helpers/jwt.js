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
            `${process.env.API_URL}/datosUsuarios/`,
            `${process.env.API_URL}/datosSocioeconomicos/`,
            `${process.env.API_URL}/alimentacionUsuarios/`,
            `${process.env.API_URL}/registroDietetico/`,
            `${process.env.API_URL}/mensajes/`,
            `${process.env.API_URL}/chat/`,
            `${process.env.API_URL}/mensajes/:id`,
            `${process.env.API_URL}/foro/`,
            { url: `${process.env.API_URL}/alimentos`, methods: ['GET'] },
            { url: `${process.env.API_URL}/grupoAlimentos`, methods: ['GET'] },
            {
                url: `${process.env.API_URL}/subGrupoAlimentos`,
                methods: ['GET'],
            },
            { url: `${process.env.API_URL}/recetas`, methods: ['GET'] },
            { url: `${process.env.API_URL}/logros`, methods: ['GET'] },
            {
                url: `${process.env.API_URL}/logrosDeUsuario/`,
                methods: ['GET', 'POST', 'PUT'],
            },
            {
                url: `${process.env.API_URL}/puntosDeUsuario/`,
                methods: ['GET', 'POST', 'PUT'],
            },
            { url: `${process.env.API_URL}/equivalencias/`, methods: ['GET'] },
            {
                url: `${process.env.API_URL}/estadisticasIMC/`,
                methods: ['GET', 'POST', 'PUT', 'PATCH'],
            },
            {
                url: `${process.env.API_URL}/estadisticasNiveles/`,
                methods: ['GET', 'POST', 'PUT', 'PATCH'],
            },
            {
                url: `${process.env.API_URL}/estadisticasPresion/`,
                methods: ['GET', 'POST', 'PUT', 'PATCH'],
            },
            {
                url: `${process.env.API_URL}/informacionUsuarios/individual`,
                methods: ['POST', 'GET'],
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
                return done(null, true);
            }
            done();
        }
        done();
    });
    done();
}

module.exports = authJwt;
