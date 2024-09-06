const express=require('express')

const router=express.Router()

// ,signUp,,deleteAccount
const{sendOTP,signUp,login,counter}=require("../controllers/Auth")
const{resetPasswordToken,resetPassword}=require("../controllers/ResetPassword")
const {verify,orders}=require("../controllers/payments");
// ,
router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP)

router.post("/counter",counter)

router.post("/resetpasswordtoken",resetPasswordToken)

router.post("/resetpassword", resetPassword)
router.post("/verify",verify);
router.post("/orders",orders);






// router.post("/deleteAccount", deleteAccount)


module.exports=router