require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { router } = require('./apiV2');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const { socketController } = require('./sockets/socket.controller');
const { trim_all } = require('request_trimmer');

const { MONGODB, DBNAME } = process.env;

//Docuemntation
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./openapi.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use(trim_all);

// routes
app.use(router);
console.log(`PORT================${process.env.PORT}`);

////Sockets
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

io.on('connection', socketController);

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server running at ${process.env.PORT || 4000}`);
});
