import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css';
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SpleshScreen from './components/SpleshScreen';
import TitlePage from './components/TitlePage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import MainPage from './components/MainPage';
import Voice from './components/Voice';
import AboutMilla from './components/AboutMilla';
import Display from './components/display';
import selVoice from './components/display';
import SelBot from './components/SelBot';
import DisplayAids from './components/displayAids';
import DisplayNostress from './components/displayNostress';
import DisplayCopublica from './components/displayCopublica';
import Test from './components/Test';
import WelcomeLogin from './components/welcomeLogin';
function App() {
  const [user, setUser] = useState(null);
  return (
<div>
<BrowserRouter >
    <Routes>
      <Route path='/' element={<SpleshScreen/>}></Route>
      <Route path='/TitlePage' element={<TitlePage/>}></Route>
      <Route path='/LoginPage' element={<LoginPage/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/Welcome' element={<Welcome/>}></Route>
      <Route path='/MainPage' element={<MainPage/>}></Route>
      <Route path='/Voice' element={<Display/>}></Route>
      <Route path='AboutMilla' element={<AboutMilla/>}></Route>
      <Route path='Display' element={<Display/>}></Route>
      <Route path='selVoice' element={<selVoice/>}></Route>
      <Route path='SelBot' element={<SelBot/>}></Route>
      <Route path='DisplayAids' element={<DisplayAids/>}></Route>
      <Route path='DisplayNostress' element={<DisplayNostress/>}></Route>
      <Route path='DisplayCopublica' element={<DisplayCopublica/>}></Route>
      <Route path='Test' element={<Test/>}></Route>
      <Route path='WelcomeLogin' element={<WelcomeLogin/>}></Route>
      {/* <Route path='*' element={<TitlePage/>}></Route> */}
    </Routes>
</BrowserRouter>

      {/* <div className='google-signUp' id='signInDiv'>
      <GoogleOAuthProvider clientId="338976857027-orhikrsb7037ussbjb5c083ksfu5679c.apps.googleusercontent.com">
        
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decodedCredential = jwtDecode(credentialResponse.credential);
            console.log(decodedCredential);
            setUser(decodedCredential); // Set user state with decoded credential
            document.getElementById("signInDiv").hidden=true;  
              }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      </div>
      
      {user && // Render user information if user is available
        <div>
          <img src={user.picture} alt="User profile"></img>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      } */}
    </div>

  );
}

export default App;
