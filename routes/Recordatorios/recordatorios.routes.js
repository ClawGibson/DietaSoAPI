const express = require("express");
const router = express.Router();


const { addReminder, getReminders, updateRemindersAddUsers, deleteReminder } = require("./controller");

router.post("/", addReminder);

router.get("/", getReminders);


//update
router.patch("/", updateRemindersAddUsers);

router.delete("/", deleteReminder);

//router.patch("/",);


module.exports = router;