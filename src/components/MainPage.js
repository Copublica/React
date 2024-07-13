import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
function MainPage() {

  console.log("welcome to main page");

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  // function deleteCookie(name) {
  //   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // }

  // function handleLogout() {
  //   deleteCookie('name');
  // }

  const userName = getCookie('name');
  return (

    <div className="hero-container" id="MainPage">
      <div className="heroGreeting">
      <div className="heading-content d-flex justify-content-between">
          <div className="hero-text">
            <h2>Welcome <br /> <span>{userName}</span></h2>
            {/* <p>lets make this day <span>delightful</span> together.</p> */}
          </div>
          
           <div className="logout text-danger" id="logout">
            <i className="fa-solid fa-power-off"></i>
          </div>
        </div>

        <div className="motivational-box">
          <Link to="/displayCopublica"> 
          <div className="voicebot-voiebot">
            <img src="assets/images/arrowtop1.png" className="toparrow"/>
            <p>Learn about how voicebots can help</p>
          </div>
          </Link>
        </div>
        <h4 className="mt-4">Use cases</h4>
        <div className="little-carousels">
          <div className="content" id="silderVoicebot">

           

            <Link to="/display" className="link">  
            <div className="voivecard">
              <h4>Social Emotional Learning</h4>
              {/* <img className="card-arrow" src="assets/images/arrow.png"></img> */}
            </div>
            </Link>
            <Link to="/displayNostress" className="link">  
            <div className="voivecard">
              <h4>Stress Management</h4>
              {/* <img className="card-arrow" src="assets/images/arrow.png"></img> */}
            </div>
            </Link>
            <Link to="/displayAids" className="link">  
            <div className="voivecard">
              <h4>AIDS Awareness</h4>
              {/* <img className="card-arrow" src="assets/images/arrow.png"></img> */}
            </div>
            </Link>

          {/* <Link to="/display" className="link">  <img src="assets/images/sel.png" className="d-block" alt="..."/></Link>
          <Link to="/displayNostress" className="link"><img src="assets/images/mental.png" className="d-block" alt="..."/></Link>
          <Link to="/displayAids" className="link"><img src="assets/images/Aids.png" className="d-block" alt="..."/></Link> */}
          </div>
        </div>
        <h4>Frequently asked questions</h4>
        <div className="convo-history">
        <Link to="/display" className="link">
        <div className="accordion1">
          <p>What is Social Emotional Learning?</p>
          </div>
        </Link>
        <Link to="/displayNostress" className="link">
          <div className="accordion1">
             <p>I am feeling anxious. What should I do?</p>
          </div>
          </Link>
          <Link to="/displayAids" className="link">
          <div className="accordion1">
            <p>What is HIV type 2?</p>
          </div>
          </Link>

        </div>
      </div>

    </div>

  )
}
export default MainPage;