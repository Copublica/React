import {React} from "react";
import { Link,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Welcome from "./Welcome";

const setCookie=(name, value, days)=> {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function LoginPage()
{

  console.log("welcome to login page");  
    return(
        <div className="container px-4" id="loginpage">
             <div className='d-flex'>
                    <div className="milaNav" style={{ zIndex: '99' }}>
                        <div className="navbar-4">
                            <Link to="/WelcomeLogin"><button className="back-button" type="button"><i className='fas fa-angle-left'></i> </button></Link>
                        </div>
                    </div>
                </div>

          <div className="container px-4 mt-5 py-5">
          <p className="title-text text-center font-weight-bold text-secondary">
          Let’s get
            <br />
            <span className="text-dark">started</span> 
          </p>
        {/* <p className="text-center text-danger mb-3">Let’s get started</p> */}
        <form action="/action_page.php">
          <div className="form-group">
            <input type="email" className="form-control" id="email"  placeholder="Email address:"/>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="pwd"  placeholder="Password"/>
            <i className="fa-regular fa-eye-slash"></i>
             {/* <i className="fa-solid fa-eye"></i>  */}
            <div className="checkbox">
              <label className="label-title px-3 py-2"><input type="checkbox" /> Remember me</label>
            </div>
          </div>
          <div className="form-group">
          <button type="button" className="btn-login btn btn-primary py-1 border-0">Log in</button>
          </div>
        </form>
        <div className="social-media text-center mt-5">
          <span className="fw-bold"/>sign in with
          <div className="social-media-icons mt-2">
            <div className="s-col-4">
              
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
              {/* <img src="assets/images/search.png" id="googleicons"/> */}
            </div>
            <div className="s-col-4">
              <img src="assets/images/facebook.png" id="facebook"/>
            </div>
            <div className="s-col-4">
              <img src="assets/images/linkedin.png" id="linkdin"/>
              </div>
          </div>
        </div>
        <div className="switch-login mt-2">
          <p className="text-center mt-2 h6">Don’t have an account? <Link to="/SignUp">Sign up</Link> 
            </p>
           
        </div>
      </div>
      </div>
    )
}
export default LoginPage;

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
  <button onClick={login} className="custom-google-btn">
  <img src="assets/images/search.png" alt="Google icon" className="google-icon" />
</button>
 )
}