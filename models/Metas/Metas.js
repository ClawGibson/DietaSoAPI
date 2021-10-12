const { Schema, model } = require("mongoose");

const metasModel = new Schema({
    objetivo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: false,
        default: "",
    },
    categoriaDeSostenibilidad: {
        type: String,
        required: true,
    }
}, { timestamp: true })

//Ejemplo de coategoria de sostenibilidad
//(cultura, sociedad, economía, ambiental, nutricional).

module.exports = model("Metas", metasModel);