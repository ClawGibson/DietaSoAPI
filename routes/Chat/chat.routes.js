const express = require('express');
const router = express.Router();

const {
    createNewChat,
    getAllChats,
    deleteChat,
    getChatId,
} = require('./controller');

router.post('/', createNewChat);
router.get('/', getChatId);
router.get('/', getAllChats);
router.delete('/', deleteChat);

module.exports = router;
