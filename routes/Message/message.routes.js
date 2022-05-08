const express = require('express');
const router = express.Router();

const { addMessage, getMessages, deleteMessage } = require('./controller');

router.post('/', addMessage);
router.get('/:id', getMessages);
router.delete('/:id', deleteMessage);

module.exports = router;
