const express = require('express');
const router = express.Router();

const {
    addReminder,
    updateReminder,
    getReminders,
    updateRemindersAddUsers,
    deleteReminder,
    getRemindersByUser,
} = require('./controller');

router.post('/', addReminder);

router.get('/', getReminders);

router.get('/usuario', getRemindersByUser);

//update
router.patch('/', updateRemindersAddUsers);

router.patch('/:id', updateReminder);

router.delete('/', deleteReminder);

//router.patch("/",);

module.exports = router;
