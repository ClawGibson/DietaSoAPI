const { Schema, model } = require("mongoose");

const likeModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: "Publication"
    }
});

module.exports = model("Like", likeModel);