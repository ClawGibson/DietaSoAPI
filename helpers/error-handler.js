function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ message: 'Acceso no autorizado' });
    }
    if (err.name === 'ValidationError') {
        return res.status(401).send({ message: err });
    }

    return res.status(500).json(err);
}

module.exports = errorHandler;
