

const bcrypt=require("bcrypt")
const mailSender=require("../utils/mailSender")
const crypto=require("crypto")
const dbPool=require("../config/dbConnect");
const mysql = require('mysql2');
const {passwordUpdated}=require("../templates/passwordUpdate")

const{successMessage}=require("../templates/successMessage")



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

exports.resetPasswordToken=async (req,res)=>{

    try{      
  
        const {email,path}=req.body

        const user=await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);

        if(!user)
        {
            return res.status(404).json({
                
                
                success:false,

                message:"Your mail is not registered with us"


            })



        }

        const resetToken=crypto.randomUUID();

        const updateDetails = await executeQuery('UPDATE Users SET resetToken = ? WHERE email = ?;', [resetToken, email]);






        const url=`${path}/enterpassword/${resetToken}`

        console.log(url);

        await mailSender(email,"Password Reset LInk",passwordUpdated(url,"user") )



        return res.status(200).json({


            success:true,
            message:"Email Sent successfully, check the email and change the password ",

        })

    }


    catch(err)
    {


        console.log(err)

        return res.status(500).json({


            success:false,
            message:"Something went wrong while reset the password token"
        })
    }




}



exports.resetPassword=async (req,res)=>{

    try{

        const {password,confirmPassword, resetToken}=req.body

        if(password!==confirmPassword)
        {

            return res.json({


                success:false,
                message:"Password is not matching"
            })
        }


        const userDetails=await executeQuery('SELECT * FROM users WHERE resetToken = ?;', [resetToken])



        console.log("old...", userDetails)

        if(userDetails.length ==0)
        {

            return res.json({


                success:false,
                message:"Not a valid token"
            })
        }


    


 

      const newRes = await executeQuery('UPDATE Users SET password= ? WHERE resetToken= ? ;', [password,resetToken]);

      console.log("....newRes", newRes)
      console.log("update hol;l de")



      await mailSender(userDetails[0].email,"Password Reset Successfully",successMessage(userDetails[0].firstName))


        return res.status(200).json({


            success:true,
            message:'Password reset successful'
        })

    }

    catch(err)
    {
        console.log(err)
        return res.status(500).json({

         
            success:false,
            message:"Error in reset password"



        })


    }



}