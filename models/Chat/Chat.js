const { Schema, model } = require("mongoose");

const chatModel = new Schema({
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    }],
})

module.exports = model("Chat", chatModel);