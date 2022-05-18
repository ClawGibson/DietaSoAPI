const express = require('express');
const router = express.Router();

const { addGoal, getGoals, updateGoal_All, deleteGoal } = require('./controller');

router.post('/', addGoal);

router.get('/', getGoals);

router.patch('/', updateGoal_All);

router.delete('/', deleteGoal);

module.exports = router;
