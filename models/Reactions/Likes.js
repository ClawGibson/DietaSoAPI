const { Schema, model } = require("mongoose");

const likeModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    activate: {
        type: Boolean,
        default: false,
    }
});

module.exports = model("Like", likeModel);