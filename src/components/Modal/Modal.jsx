import { useSelector } from "react-redux";
import axios from "axios";
import "./Modal.css";
import React, { useRef, useState,useEffect} from "react";

function Modal(){

    const userDataString = localStorage.getItem('user');

	const user = JSON.parse(userDataString);

	

	console.log("Modal user is ",user[0]?.counter);

    var name=user[0]?.firstName;

	var coun=user[0]?.counter;

    
  //payment

  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      document.head.removeChild(script);
    };
  }, []);

  const [book, setBook] = useState({
		name: "Resume Builder",
		author: "",
		img: "https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg",
		price: 15,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_GLkii5QtmPga15",
			amount: data.amount,
            email:user?.email,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
                    const updatedResponse = { ...response, email: user[0]?.email };
					const verifyUrl = "http://localhost:4000/api/v1/auth/verify";
					const { data } = await axios.post(verifyUrl,updatedResponse );
					console.log("after payment data is",data);
					localStorage.setItem("user", JSON.stringify(data.user));
					window.location.reload();
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const requestData = {
        amount: book.price,
        email:user?.email,
      };
  

	const handlePayment = async () => {
		try {
      console.log("Chala kiya")
			const orderUrl = "http://localhost:4000/api/v1/auth/orders";
            console.log("resa data is",requestData);
			const { data } = await axios.post(orderUrl, requestData);
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};



    return(
	<div>
		{
			coun==0 && <div className="modal_lim">
			<div className="dear">Dear <span>{name?.slice(0,1)?.toUpperCase()}{name?.slice(1,)}, </span></div>
		<div className="dear-msg">We hope you enjoyed the benefits of our free trial period. Regrettably, the trial has now concluded. To continue accessing the full range of features on our website, a subscription is required.</div>
		<button className="dear_btn"onClick={handlePayment} >Pay</button>
	</div> 
		}
	</div>
    )
}

export default Modal;