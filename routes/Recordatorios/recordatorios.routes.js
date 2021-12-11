const express = require("express");
const router = express.Router();


const { addReminder, getReminders, updateRemindersAddUsers, deleteReminder, getRemindersByUser } = require("./controller");

router.post("/", addReminder);

router.get("/", getReminders);

router.get("/usuario", getRemindersByUser);


//update
router.patch("/", updateRemindersAddUsers);

router.delete("/", deleteReminder);

//router.patch("/",);


module.exports = router;