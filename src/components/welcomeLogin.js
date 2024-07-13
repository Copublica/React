import React, { useState, useEffect } from 'react';
// import logo from '../logo.jpg';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link,useNavigate } from "react-router-dom";

const setCookie=(name, value, days)=> {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

const WelcomeLogin = () => {
  const [user, setUser] = useState({ name: '', picture: '', exp: '' });

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser({
      name: decoded.name,
      picture: decoded.picture,
      exp: decoded.exp,
    });
    console.log(decoded);
  };

  const handleGoogleError = () => {
    console.log('Login Failed');
  };

  useEffect(() => {
    if (user.name){
        console.log('User state has been updated: ', user);
    }
  },[user]);

  return (
    <div className="auth-container text-center">
      <div className="auth-contents">
        <div className="logo-section">
          <div className="logo">
            <img className="" src='/assets/images/logo.png' alt="logo" />
          </div>
          <div className="logo-heading">
            <h3 className="mt-3 fs-5"></h3>
            <p className='w-p-text'>Hello! Ready to begin?</p>
          </div>
        </div>
        <div className="button-section">
          <div>
          <Link to='/SignUp'> <button className="register welcome-button">Register</button></Link>
          </div>
          <div>
            <Link to='/LoginPage'><button className="login welcome-button">Login</button></Link>
          </div>
        </div>
        <div className="google-login">
          <div className="line"></div>

        <GoogleOAuthProvider clientId="338976857027-7eaird3188j265pb2vf0ltmt7m53o01c.apps.googleusercontent.com">
        
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decodedCredential = jwtDecode(credentialResponse.credential);
            console.log("deatails:- "+decodedCredential);
              // Setting cookies with user information
              // setCookie('name', decodedCredential.name, 70); // Expires in 7 days
              // setCookie('email', decodedCredential.email, 70);
              // setCookie('picture', decodedCredential.picture, 70);
             
              }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <CustomButton/>
      </GoogleOAuthProvider>
        </div>
        {/* {user.name && (
          <div className="user-info">
            <img src={user.picture} alt={user.name} />
            <h3>{user.name}</h3>
            <p>Token expires at: {new Date(user.exp * 1000).toLocaleString()}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WelcomeLogin;

export const CustomButton=()=>
{
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      const options = { 
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}` },
      };
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCookie('name', data.given_name, 7); // Expires in 7 days
          setCookie('email', data.email, 7);
          setCookie('picture', data.picture, 7);
          navigate('/MainPage');
          // Use the user's credentials here
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });
 return(
  <button onClick={login} className="w-custom-google-btn">
   
  <img src="assets/images/search.png" alt="Google icon" className="w-google-icon" /> 
  <span className='w-google-text'>Sign with google</span> 
</button>
 )
}