const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images');
    },
    filename: function(req, file, cb) {   
        console.log(file);
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        console.log(file);
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

const router = express.Router();

const { getUser, getAllUser, registerUser, loginUser, updateUser } = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/:id", getUser);
router.get("/", getAllUser);
router.put("/:id",upload.single("photo"), updateUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
