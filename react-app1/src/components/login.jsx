import './login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const navigate=useNavigate();
    const handleLoginSubmit=()=>{
          fetch(`http://localhost:5125/validateUser`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },        
            body: JSON.stringify({
                userName:userName,
                password:password,
                authtoken:''
            })
          })
          .then(response=>{
            if(response.ok)
                {
            localStorage.setItem('userName',userName);
            return response.json();
                }
                else{
                  setErrorMessage('username or password is incorrect');
                }

          })
          .then(data=>{
            if(data)
            {
            navigate('/images');
            }
          });
        }
    return (
        <div class="login-container">
  <div class="login">
    <br />
        <div class="login-title">LOGIN</div>
        <label for="username"> Username: </label>
        <input
          type="text"
          id="username"
          class="signup-input"
          value={userName}
          onChange={(e)=>{setUserName(e.target.value)}}
          name="name"
        /><br />
        <label for="password"> Password: </label>
        <input
          type="password"
          id="password"
          class="signup-input"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          name="pass"
        /><br />
        <h4>{errorMessage}</h4>
        <button type="submit" class="signup-button" onClick={handleLoginSubmit}>Login</button>
    <button onClick={()=>{navigate('/signup')}} class="signup-button">
      Signup
    </button>
  </div>
</div>
    )

}
export default Login;