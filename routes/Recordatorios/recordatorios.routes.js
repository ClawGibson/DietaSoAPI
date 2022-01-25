const express = require("express");
const router = express.Router();


const { addReminder, getReminders, updateRemindersAddUsers, deleteReminder, getRemindersByUser, updateRemindersAddUsersToConfirm } = require("./controller");

router.post("/", addReminder);

router.get("/", getReminders);

router.get("/usuario", getRemindersByUser);


//update
// router.patch("/", updateRemindersAddUsers);
router.patch("/", updateRemindersAddUsersToConfirm);

router.delete("/", deleteReminder);

//router.patch("/",);


module.exports = router;