const express = require("express");
const router = express.Router();

const { createNewComment, getCommentsByIdPublication } = require("./controller");

router.post("/:id", createNewComment);
router.get("/:id", getCommentsByIdPublication);

module.exports = router;