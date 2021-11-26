const express = require("express");
const router = express.Router();

const {
    createNewPushToken,
    getSelected,
    getPushTokens,
    actualizarPushToken
} = require("./controller");

router.post("/", createNewPushToken);
router.get("/varios", getSelected);
router.get("/", getPushTokens);
router.patch("/actualizarToken", actualizarPushToken);

module.exports = router;