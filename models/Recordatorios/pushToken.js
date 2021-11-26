const { Schema, model } = require('mongoose');

const pushTokenModel = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    token: {
        type: String,
    }
});


module.exports = model("PushToken", pushTokenModel);