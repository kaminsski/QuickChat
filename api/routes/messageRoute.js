const express = require('express');

const router = express.Router()

const {getMessage, postMessage, getMessageBox} = require("../controllers/messageController")

const {auth} = require("../middlewares/authMiddleware")

router.get("/box/:id",auth, getMessageBox)
router.get("/:id", auth,getMessage)
router.post("/",auth, postMessage)

module.exports = router