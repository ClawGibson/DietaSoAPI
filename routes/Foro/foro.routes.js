const express = require("express");
const router = express.Router();

const { createNewPublication, getAllPublications, getAllPublicationsPupulate, updatePublication, deletePublication } = require("./controller");

router.post("/", createNewPublication);
router.get("/", getAllPublicationsPupulate);
router.patch("/:_id", updatePublication);
router.delete("/", deletePublication);


module.exports = router;
