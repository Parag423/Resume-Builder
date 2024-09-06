import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Studentdashboard from "./Student/Studentdash";
// import Instructordasbboard from "./Instructor/Instructordasbboard";
import resumepic from "../../assets/resumepic.png";
import "./home.css";

const Home=()=>{
    const navigate=useNavigate();
    const user=useSelector((state)=>state.auth.user);
    console.log(user);
    return (
        <div>
           { <div className="Home-wrp">
                <div className="home-inner">
                    <div className="home-inner-div">
                        <img className="home-img" src={resumepic}/>
                    </div>
                  <div className="home-right">

                  <p className="home_name">Resume Builder</p>
                    <p className="home-sub">Build beautiful, recruiter-tested resumes in a few clicks! Our resume builder is powerful and easy to use, with a range of amazing functions. Custom-tailor resumes for any job within minutes. Increase your interview chances and rise above the competition.</p>
  
                    <p className="createupto">Create up to 3 stunning resumes for free. Your career journey begins here, and we're here to help you craft professional and eye-catching resumes that stand out.</p>

                    <div className="home-btn">
               <Link className="Link linknew" to="/login">Login</Link>
                <Link className="Link lnk linknew" to="/Signup">Signup</Link>
                </div>

                    </div>
                </div>    
              
            </div>}
            {/* {user?.accountType=="Student" && <Studentdashboard/>}
            {user?.accountType=="Instructor" &&<Instructordasbboard/>} */}
        </div>
    )
}

export default Home;