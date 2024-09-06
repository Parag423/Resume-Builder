import React from "react";
import { useNavigate } from 'react-router-dom';
import resumeSvg from "../../assets/vec.jpg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  function exitHandeler(){
    localStorage.removeItem('user');
    console.log("Exit")
    navigate('/');
    window.location.reload(true); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          A <span>Resume</span> that stands out!
        </p>
        <p className={styles.heading}>
          Make your own resume. <span>It's free</span>
        </p>
      </div>
      <div className={styles.right}>
        <img src={resumeSvg} alt="Resume" />
      </div>
      <RiLogoutCircleRLine onClick={()=>exitHandeler()} style={{ color: 'crimson', fontSize: '2rem', position:'absolute',top:'2rem',right:'2rem',cursor:'pointer' }} />
    </div>
  );
}

export default Header;
