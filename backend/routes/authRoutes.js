const express =require("express");
const router = express.Router();


const {registerUser, loginUser, logout} = require("../controller/authController")


router.post("/register",registerUser);
router.post("/",loginUser);
router.get("/",logout)

module.exports = router;