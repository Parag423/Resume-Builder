// const User=require("../model/User")


// require("dotenv").config()

// const jwt=require("jsonwebtoken")


// exports.auth=async (req,res,next)=>{

// try{

//     token=req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "")

//     if(!token)
//     {

//         return res.status(401).json({

//             success:false,
//             message:"Token is missing"

//         })
//     }


//     const decode=jwt.verify(token,process.env.JWT_SECRET)

//     console.log(decode)

//     req.user=decode


// }


// catch(err)
// {

// console.log(err)
// return res.status(401).json({

//     success:false,
//     message:"Authentication error in middlewares"
// })


// }

// next()

// }
