const express = require("express");
const authController = require("../controllers/auth.controller")



router = express.Router() ;

router.post("/register" , authController.userRegister);

router.post("/login" , authController.login);



module.exports = router ;