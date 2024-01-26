const express = require("express");

const router = express.Router();

const {addUser, allUser,deletealluser} = require("../controllers/authController")

router.route("/signIn").post(addUser);

router.route("/alluser").get(allUser);

router.route("/deletealluser").get(deletealluser);

module.exports = router;