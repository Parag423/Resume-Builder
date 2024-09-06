
const Razorpay = require("razorpay");
const crypto = require("crypto");
require('dotenv').config();

const dbPool=require("../config/dbConnect");
 const mysql = require('mysql2');

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


exports.orders= async (req, res) => {

	const { amount, email } = req.body;

	console.log("Data is",email);
	
	try {
		const instance = new Razorpay({
			// key_id: process.env.KEY_ID,
			// key_secret: process.env.KEY_SECRET,
			key_id:"rzp_test_GLkii5QtmPga15",
			key_secret:"MKrqJDyoIzI7kGhJvBj74Agd"
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
			
		};

		console.log("1");
      console.log(options.amount);
		instance.orders.create(options, (error, order) => {
			


			if (error) {
				console.log("2.1");
				console.log("error is",error);
				console.log("3.5")
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
		console.log("2");
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
};

exports.verify= async (req, res) => {
	try {
		const { razorpay_order_id,email, razorpay_payment_id, razorpay_signature } =
			req.body;
			console.log("Final email is",email);
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

			console.log("3");

		if (razorpay_signature === expectedSign) {
			console.log("4");

			const checkUserPresent = await executeQuery('UPDATE users SET counter = 3 WHERE email = ?', [email]);
            const user=await executeQuery('select * from users where email =? ', [email])
			return res.status(200).json({
				
				message: "Payment verified successfully" ,
				 user:user
		
		
		});

		} else {
			console.log("5");
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		console.log("6");
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
};

