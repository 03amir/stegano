const express = require("express");
const router = express.Router();
const { addUser, checkAuth, updateUser } = require("../controllers/authController");
const verify = require("../middlewares/verify");

router.route("/signIn").post(addUser);
router.route("/updateUser").put(verify, updateUser)
router.route("/isAuthentic").post(checkAuth);


module.exports = router;