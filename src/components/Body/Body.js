import React, { useRef, useState,useEffect} from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown, Download } from "react-feather";
import { useSelector } from "react-redux";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import ResumeSec from "../Resume/ResumeSec";
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import {auth_apis} from "../../Services/apis";
import styles from "./Body.module.css";
import { apiConnector } from "../../Services/apiConnector";

import { Helmet } from "react-helmet";


function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const template=["Template1","Template2","Template3"]
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });
  const userDataString = localStorage.getItem('user');

	const user = JSON.parse(userDataString);

	console.log("User is is",user.counter);

  var c=user[0]?.counter;

 async function DownloadHandeler(){
   try{
    console.log("User is",user);
    
    var data={
      token:user[0].token
    }
    console.log("token is",user[0].token);
    const res=await apiConnector("POST",auth_apis.COUNTERINC,data);
    console.log("res is",res);
    console.log("New user is",res.data.user[0]);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    handleDownload();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
   
   }
   catch(error){
console.log(error);
   }
  }

  ///new code

useEffect(()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
},[])
 

  const handleDownload = () => {
    html2canvas(resumeRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'resume.png';
      link.click();
    });
    
  };

  const [temp,setTemp]=useState("Template1");


  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <div className="template">
          {template.map((item)=>(
            <span onClick={()=>setTemp(item)}>{item}</span>
          ))}
        </div>
       <div  onClick={()=>DownloadHandeler()}>
       { c!=0 &&
            <button >
                Download <ArrowDown />
              </button>}
         
       </div>
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />

       {temp=="Template1" && <Resume
     
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
          id="resume"
        />}
       {temp=="Template2" && <ResumeSec
     
     ref={resumeRef}
     sections={sections}
     information={resumeInformation}
     activeColor={activeColor}
     id="resume"
   />}

   </div>
      </div>
   
  );
}

export default Body;
