import Resume from "../Resume/Resume_main"
import Home from "../Home/home";

import { useSelector } from "react-redux";

function Home_main(){
  const userDataString = localStorage.getItem('user');
  const user = JSON.parse(userDataString);


  console.log("local user is",user);

    return (
      <div>
         {
        user && <Resume/>
  
       }
       {
              !user && <Home/>
       }
      </div>
    )
}

export default Home_main;