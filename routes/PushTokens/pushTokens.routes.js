const express = require("express");
const router = express.Router();

const {
    createNewPushToken,
    getSelected,
    getPushTokens
} = require("./controller");

router.post("/", createNewPushToken);
router.get("/varios", getSelected);
router.get("/", getPushTokens);

module.exports = router;