const express = require("express");
const router = express.Router();

const { createNewChat, getAllChats, deleteChat } = require("./controller");

router.post("/", createNewChat);
router.get("/", getAllChats);
router.delete("/:id", deleteChat);


module.exports = router;