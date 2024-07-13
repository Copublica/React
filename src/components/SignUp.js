import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return ( 
    <>
        <div className="container text-center px-4" id="loginpage">
        <div className='d-flex'>
                    <div className="milaNav" style={{ zIndex: '99' }}>
                        <div className="navbar-4">
                            <Link to="/WelcomeLogin"><button className="back-button" type="button"><i className='fas fa-angle-left'></i> </button></Link>
                        </div>
                    </div>
                </div>

            <img  src="assets/images/registration-img.png" id="registerImg"></img>
        <p className="title-text text-center font-weight-bold text-secondary">
        
          <span className="text-dark">Get Started</span>
        </p>
        <p className="text-center text-dark mb-3">by creating a <span className="text-danger">free account</span></p>
        <form action="/action_page.php">
          <div className="form-group">
            <input type="text" className="form-control" id="username"  placeholder="Full name:"/>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id="email"  placeholder="Email ID:"/>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-group">
            <input type="phone" className="form-control" id="phoneno"  placeholder="Phone no"/>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="pwd"  placeholder="Password"/>
            <i className="fa-regular fa-eye-slash"></i>
             {/* <i className="fa-solid fa-eye"></i>  */}
            <div className="checkbox">
              <label className="label-title px-3 py-2"><input type="checkbox" /> By checking the box you agree to our <span className="text-danger">Terms</span>  and <span className="text-danger">Conditions</span> </label>
            </div>
          </div>
          <div className="form-group">
          <button type="button" className="btn-login btn btn-primary py-1 border-0">Done</button>
          </div>
        </form>
     
        <div className="switch-login mt-2 mb-2">
          <p className="text-center mt-2 h6">Already a member? <Link to="/LoginPage">Login</Link>
          </p>
        </div>
      </div>
      </>
  )
}
export default SignUp;