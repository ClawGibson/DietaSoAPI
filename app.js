require("dotenv/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const grupoAlimentosRoute = require("./routes/grupoAlimentos.routes");
const alimentosRoute = require("./routes/alimentos.routes");
const subGrupoAlimentosRoute = require("./routes/subGrupoAlimentos.routes");
const recetasRoute = require("./routes/recetas.routes");
const usuariosRoute = require("./routes/usuarios.routes");
const menusBaseRoute = require("./routes/menusBase.routes");
const logros = require("./routes/logros.routes");
const logrosDeUsuario = require("./routes/logrosDeUsuario.routes");
const puntosDeUsuario = require("./routes/puntosDeUsuario.routes");
const equivalencias = require("./routes/Import/equivalences.routes");
const informacionUsuarios = require("./routes/InformacionUsuarios.routes");
const datosUsuarios = require("./routes/datosUsuarios.routes");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const { API_URL, PORT, MONGODB, DBNAME } = process.env;

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

// routes
app.use(`${API_URL}/alimentos`, alimentosRoute);
app.use(`${API_URL}/grupoAlimentos`, grupoAlimentosRoute);
app.use(`${API_URL}/subGrupoAlimentos`, subGrupoAlimentosRoute);
app.use(`${API_URL}/recetas`, recetasRoute);
app.use(`${API_URL}/usuarios`, usuariosRoute);
app.use(`${API_URL}/menusBase`, menusBaseRoute);
app.use(`${API_URL}/logros`, logros);
app.use(`${API_URL}/logrosDeUsuario`, logrosDeUsuario);
app.use(`${API_URL}/puntosDeUsuario`, puntosDeUsuario);
app.use(`${API_URL}/equivalencias`, equivalencias);
app.use(`${API_URL}/informacionUsuarios`, informacionUsuarios);
app.use(`${API_URL}/datosUsuarios`, datosUsuarios);

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
