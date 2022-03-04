const { Schema, model } = require("mongoose");

const messageModel = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    message: {
        type: String,
        require: true,
    },
    date: Date,
    file: String,
});

module.exports = model("Message", messageModel);