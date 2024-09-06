import React from "react";



import "./App.css";




import Home_main from "./components/Home_main/Home_main";


import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Enterotp from "./components/OTP/otp";
import Resetpassword from "./components/Resetpassword/Resetpassword";
import Enterresetpasssword from "./components/Enterpassword/Enteresetpassword";



import { useSelector } from "react-redux";
import Loading from "./components/Loading/loading";






function App() {

  const user=useSelector((state)=>state.auth.user);
  console.log("user baby",user)
    const loading=useSelector((state)=>state.auth.loading);

    console.log("user is",user);
  

  return (

    <div className="app">{
  
      }
      { <Routes>
          <Route path="/" element={<Home_main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/otp" element={<Enterotp/>}/>
          <Route path="/resetpassword" element={<Resetpassword/>}/>
          <Route path="/resetpassword/enterpassword/:id" element={<Enterresetpasssword/>}/>
          
        </Routes>
}
        {
          loading &&
          
         <div className="ap-loading">
           <Loading />
         </div>
        }
    </div>
   
  );
}

export default App;



