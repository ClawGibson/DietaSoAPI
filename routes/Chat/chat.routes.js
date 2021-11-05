const express = require('express');
const router = express.Router();

const {
    createNewChat,
    getAllChats,
    deleteChat,
    getChatId,
} = require('./controller');

router.post('/', createNewChat);
router.get('/', getAllChats);
router.get('/:users', getChatId);
router.delete('/:id', deleteChat);

module.exports = router;
