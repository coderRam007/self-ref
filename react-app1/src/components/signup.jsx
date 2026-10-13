import { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const navigate=useNavigate();
    const handleSignupSubmit=()=>{
      if(confirmPassword!==password)
        setErrorMessage('password must match with confirmed password');
      else
      {
        fetch(`http://localhost:5125/addUser`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },        
          body: JSON.stringify({
              userName:userName,
              password:password,
              authtoken:''
          })
        }).then(response=>{
        if(response.ok)
        { 
          navigate('/newprofile');
        }
        else{
          return response.json();
        }
        })
        .then(error=>{
          if(error)
          setErrorMessage(error.error);
        })
        
      } 
    }
    return(
        <div class="login-container">
        <div class="login">
          <br /> 
        <h2>Sign Up</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            class='signup-input'
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            class='signup-input'
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
            name="signuppass"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
          class='signup-input'
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div class="printMessage">{errorMessage }</div>
        <button class="signup-button" onClick={handleSignupSubmit}>Sign Up</button>
    <button onClick={()=>{navigate('/login');}} class="signup-button">
      Login
    </button>
    </div>
    </div>
    )
};