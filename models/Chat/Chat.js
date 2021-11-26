const { Schema, model } = require("mongoose");

const chatModel = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    }],
})

module.exports = model("Chat", chatModel);