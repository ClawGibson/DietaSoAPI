const { Schema, model } = require("mongoose");

const commentModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    text: {
        type: String,
    },
    id_publicacion: {
        type: Schema.Types.ObjectId,
        ref: "Publication"
    }
});

module.exports = model("Comment", commentModel);