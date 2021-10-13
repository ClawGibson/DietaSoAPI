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
    activate: {
        type: Boolean,
        default: false,
    }
});

module.exports = model("Comment", commentModel);