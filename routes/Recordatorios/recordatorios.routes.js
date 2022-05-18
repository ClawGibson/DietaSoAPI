const express = require('express');
const router = express.Router();

const {
    addReminder,
    getReminders,
    updateReminder,
    deleteReminder,
    getRemindersByUser,
    updateRemindersAddUsersToConfirm,
    getSingleReminder,
} = require('./controller');

router.post('/', addReminder);

router.get('/', getReminders);

router.get('/usuario/:id', getRemindersByUser);

router.get('/:id', getSingleReminder);

//update
router.patch('/', updateRemindersAddUsersToConfirm);

router.patch('/:id', updateReminder);

router.delete('/:id', deleteReminder);

module.exports = router;
