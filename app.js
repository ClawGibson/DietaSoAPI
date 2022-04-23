require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { router } = require('./apiV2');
const { socketController } = require('./sockets/socket.controller');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

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

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: DBNAME,
        useFindAndModify: false,
    })
    .then(() => {
        //Sockets
        io.on('connection', socketController);

        console.log(`Succefully connected to database ${DBNAME}`);
        server.listen(process.env.PORT || 4000, () => {
            console.log(`Server running at ${process.env.PORT || 4000}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
