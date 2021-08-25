//see copy header.js
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../static/images/logo.png";
import {connect} from 'react-redux';
//isempty true means koi bhi sign in nhi hai aur isloaded true means jo process honi thi vo ho chuki hai
//store ke ander jo firestore stored hai na usi me mai isempty aur isloaded stored hai
import {isLoaded,isEmpty} from 'react-redux-firebase';
import * as authActions from '../../actions/authActions'
//firebase ke ander ke auth ko react-redux-firebase library manage karti hai
function LoggesOut(props) {
  return (
    <ul>
      <li className="signup ">
        <NavLink className=" btnv-1" to="/register">
        Register
        </NavLink>
      </li>
      <li className="signin"> 
        <NavLink className="text-blue btnv-3" to="/login">
        Sign In
        </NavLink>         
      </li>
    </ul>
  )
}

const Header = (props) => {
  const auth = props.auth;
  const handleLogOut=()=>{
   console.log('The user will sign out');
   props.signOut();
  }

  return (  
  <header className="header">
  <nav className="nav">
      <a href="/" className="holder-logo">
        <img className='logo' src={logo}></img>
      </a> 
        <div className="header-links full-height">
        {/*ab isloaded aur isempty function ko auth pe use karenge*/}
        { isLoaded(auth) && !isEmpty(auth) ?<>

          <ul>
            <li className="signin ">
              <NavLink className="  " to="/">
               Logged in as {auth.email}
              </NavLink>
            </li>
            <li className="signin"> 
              <button className="text-blue btnv-3" onClick={handleLogOut}>
             Signout
              </button>         
            </li>
          </ul>

        </>:<LoggesOut></LoggesOut>}
          
          <ul id="nav-mid">
            <li>
            <NavLink className="btn-nvt-gm" to="/resume-templates">
            Resume Templates
            </NavLink>
            </li> 
            <li className="holder-pricing">            
              <NavLink className="btn-nvt-gm" to="/about-us">
              About Us
              </NavLink>
            </li>        
          </ul>
            
      </div>   
    </nav>
  </header>

  );
};

const mapStateToProps=(state)=>{
  return{
    //ye firebase k auth hai state ka auth nhi hai "auth":{"ErrorMessage":"", "loading":false} wala nhi hai
     auth: state.firebase.auth
  }
}
const mapDispatchToProps= (dispatch)=>{
  return {
    //agar user signed in hai to loggedin as aur signout ka button aur 
   signOut:()=>dispatch(authActions.signout())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);