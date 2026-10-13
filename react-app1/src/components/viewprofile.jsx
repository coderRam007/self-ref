import { useState,useEffect } from 'react';
import './viewprofile.css';
import Header from '../common/header/tabmenuheader';
export default function ViewProfile(){
    const [item,setProfile]=useState(null);
    const [path,setPath]=useState('');
    useEffect(()=>{
        fetch("http://localhost:5125/getProfileData")
        .then((response) => response.json())
        .then((data) => {
          var modifiedData = data.map((item) => ({
            ...item,
            dob:new Date(item.dob)
          }));
          setProfile(modifiedData.filter((item)=>(!item.userName.localeCompare(localStorage.getItem('userName'))))[0]);
        })
        .catch((error) => console.error("Error:", error));
    },[]);
    useEffect(()=>{
        if(item)
            setPath('data:image/jpg;base64,'+item.profile);
    },[item]);
    if(item===null)
        return(<div></div>);
    const formatDate = (value) => {
        return value.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      };
    return(
    item &&
    <>
    <Header/>
     <div class="container">
            <div class="wrapper">
                <div class="gridcontainer">
                    <div class="personal">
                        <h4>Personal Details</h4>
                        <div class="un">
                            <p>Username:{item.userName}</p>
                        </div>
                        <div class="fn">
                            <p>First Name: {item.firstName}</p>
                        </div>
                        <div class="ln">
                            <p>Last Name: {item.lastName}</p>
                        </div>
                        <div class="dob">
                            <p>Date Of Birth: {formatDate(item.dob) }</p>
                        </div>
                        <div class="gender">
                            <p>Gender: {item.gender}</p>
                        </div>
                    </div>
                    <div class="profileimage">
                        <img class='profile-img' src={`data:image/jpg;base64,${item.profileImage}`} alt='error'/>
                    </div>  
                </div>
                <div class="grid2">
                    <div class="contact">
                        <h4>Contact Details</h4>
                        <div class="contactnumber">
                            <p>Contact Number: {item.contactNumber}</p>
                        </div>
                        <div class="emailId">
                            <p>Email ID: {item.emailId}</p>
                        </div>
                        <div class="address">
                            <p>Address: {item.address},</p>
                            <p>{item.city}-{item.pincode},{item.state}</p>
                        </div>
                    </div>
                    <div class="education">
                        <h4>Educational Details</h4>
                        <div class="degree">
                            <p>Degree: {item.degree}</p>
                        </div>
                        <div class="specialization">
                            <p>Specialization: {item.specialization}</p>
                        </div>
                        <div class="occupation">
                            <p>Occupation: {item.occupation}</p>
                        </div>
                        <div class="company">
                            <p>Company: {item.company}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}