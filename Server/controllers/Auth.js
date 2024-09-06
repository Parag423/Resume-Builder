
    

 const mailSender=require("../utils/mailSender")
 const otpTemplate=require("../templates/emailVerificationTemplate");
 const dbPool=require("../config/dbConnect");
 const mysql = require('mysql2');
 const otpGenerator=require("otp-generator")




const executeQuery = async (query, values) => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fUckE15@",
        database: "resume",

        // host:"sql6.freesqldatabase.com",
        // user: "sql6680355",
        // password:"sleEqS2WYc",
        // database: "sql6680355",
    });

    try {
        // Connect to the MySQL database
        await connection.promise().query('START TRANSACTION'); // If you want to start a transaction

        const [rows] = await connection.promise().execute(query, values);

        // Commit the transaction if it was started
        await connection.promise().query('COMMIT');

        return rows;
    } catch (err) {
        // Rollback the transaction if an error occurs
        await connection.promise().query('ROLLBACK');
        throw err;
    } finally {
        // Close the connection
        connection.end();
    }
};

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);

        if (checkUserPresent.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'User Already Exists',
            });
        }

        // Generate OTP
        // ...



    var otp=otpGenerator.generate(6,{

        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false


    })


    var result=await executeQuery('SELECT * FROM OTPs WHERE otp = ?', [otp]);

    console.log("OTP", otp);

    console.log("result is",result);


    while(result.length !=0)
    {
        console.log("2");
        otp=otpGenerator.generate(6,{

            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
    // console.log("3");
         result=await executeQuery('SELECT * FROM OTPs WHERE otp = ?', [otp]);
    }


//mail send

// console.log("4");

mailSender(email,'OTP Verification for Resume Generator',otpTemplate(otp,'User'));

console.log("mail sola ni");


        // Insert OTP into the database
        // ...



        await executeQuery('INSERT INTO OTPs (email, otp) VALUES (?, ?)', [email, otp]);




        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
    
counter=async (req,res)=>{
    try{
        const {email}=req.body;

    
    
  return res.status(200).json({
    success:true,
    message:"Counter value update succesfully"
  })

}

    catch(error){
        console.log(error);
       return  res.status(400).json({
            success:false,
            message:"error during updation of counter"
        })
    }
}


exports.counter=async (req,res)=>{
  try { 
    const {token}=req.body;

console.log("tokrn is",token);
    const counter_val=await executeQuery('SELECT counter FROM Users WHERE token = ?', [token]);


    var k=counter_val[0].counter;


    if(k>0){
    
  
    k--;
    console.log(k);

   await executeQuery('UPDATE Users SET counter = ? WHERE token = ?;', [k, token]);
    }

    else {
        console.log("Poisa lagbo");
    }


    const user = await executeQuery('SELECT * FROM Users WHERE token = ?', [token]);

   return res.status(200).json({
        success:true,
        counter_value:k,
        user:user
    })
}
catch(error){
    return res.status(500).json({
        success:false
    })
}
}







exports.signUp=async (req,res)=>{

try{

    const{

   firstName,
            lastName, email, password, confirmPassword,
            otp

    }=req.body


    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
    {

        return res.status(403).json({
        
            success:false,
            message:"All the field required"
        })
    }


    if(password!==confirmPassword)
    {
       return res.status(400).json({

        success:false,
        message:"password and confirmpassword mismatch"
        
       }) 
    }

    const existingUser=await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);

    if(existingUser.length != 0)
    {
        return res.status(400).json({

            success:false,
            message:"User already Registered"

        })
    }

//random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// Example: Generate a random string of length 10
const token = email+generateRandomString(10);
    //insert user data in DB

    await executeQuery('INSERT INTO Users (firstName,lastName,email,password,token) VALUES (?, ?, ?, ?, ?)', [firstName,lastName,email,password,token]);


    return res.status(200).json({


        success:true,
        message:"User Sign Up suuccessfully"
    })

}

catch(error){

    console.log("error is",error);
    return res.status(500).json(
        {
            success:false,
            message:"Signup failed"
        }
    )
}

}








exports.login=async (req,res)=>{
    
    try{
    
        const {email, password}=req.body
    
        if(!email || !password)
        {
    
            return res.status(403).json({
    
                success:false,
                message:"All the fields are required"
    
    
            })
        }
    
    
        let user=await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);
    
        console.log(".....user",user)
    
        if(!user)
        {
    
            return res.status(404).json({
    
                success:false,
                message:"User is not registered, plase sign up first",
    
    
    
            })
        }
        
if(user[0].password != password){
    return res.status(400).json(
        {
            success:false,
            message:"Incorrect password"
        }
    )
}

    var tkn=user[0].token;
    
    
            res.cookie("token", user[0].token).status(200).json({
    
                success:true,
    
                tkn,
                user,
    
                message:"Logged in successfully"
    
            })
        }
    
   
    
    catch(err)
    {
        console.log(err)
    
        return res.status(500).json({
    
    
    
            success:false,
            message:"Login Failure, please try again "
    
    
        })
    
    
    }
    
    }
    




    
    
    
    
    
    
