const express = require("express");
const router = express.Router();
const { createUser, getuserByName } = require("../controller/userController");
router.post("/signup", createUser);

router.get("/users", getuserByName);

module.exports = router;
