require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { router } = require('./apiV2');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const { trim_all } = require('request_trimmer');

const { MONGODB, DBNAME } = process.env;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use(trim_all);

// routes
app.use(router);
console.log(`PORT================${PORT}`);
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

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running at ${process.env.PORT || 4000}`);
});
