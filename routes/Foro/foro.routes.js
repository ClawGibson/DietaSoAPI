const express = require('express');
const router = express.Router();

const {
    createNewPublication,
    getAllPublicationsPupulate,
    updatePublicationAddLike,
    deletePublication,
} = require('./controller');

router.post('/', createNewPublication);
router.get('/', getAllPublicationsPupulate);
router.patch('/:id', updatePublicationAddLike);
router.delete('/', deletePublication);

module.exports = router;
