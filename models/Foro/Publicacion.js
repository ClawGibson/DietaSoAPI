const { Schema, model } = require("mongoose");

const publicationModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: true,
    },
    post: {
        type: String,
    },
    file: {
        type: String,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Like",
    }]
});

module.exports = model("Publication", publicationModel);