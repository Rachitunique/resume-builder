import React, { useEffect, useState } from "react";
import update from 'immutability-helper';
import { connect } from "react-redux";
// import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import { isLoaded } from 'react-redux-firebase'
import { useHistory } from "react-router";

function Login(props) {
  console.log(props);
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //signin, signout karne pe props change hote hai isliye props ka dependence jaa rha hai
  //agar signin tha aur ab signout kar diya(ab is case me component did mount dubara nhi chalega)
  //to props change aur login ka page aana chahiye
  useEffect(() => {
    //agar firebase ke auth ke ander koi uid pdi hai iska matlab hmara user signed-in hai to history ko push kra diya
    if (props.authFirebase?.uid) {
      history.push('/')
    }
  }, [props])
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const onSubmit = () => {

    let obj = { email: email, password: password }
    console.log(obj)
    //signin ka method dispatch kar diya
    props.signIn(obj)
  }


  return (
    <>
      {/*
      har page pe jakar firebase ka authentication state banta hai isliye loading nhi ho rhi hoti hai 
      pahla jo authentication hota firebase ka wo firse initialize hota hai pahle render le pass koi information nhi hai
      hai auth ki to wo form show karn deta hai aur wo jab useeffect pe jata hai tab pta chalta hai ki form to show karna
      hi nhi tha aur redirect kar deta hai isliye jabtak loading nhi ho rhi tab tak page dikhaunga nhi*/}
      {!isLoaded(props.authFirebase) ? <></> :
        <>
          {/*authmine is auth of state not firebase*/}
          {props.authMine?.loading ? <h4 style={{ marginTop: '10%', height: '52vh' }}>Patiently Wait...we are logging you in</h4> :
            <div className="container med contact">
              <div className="section funnel-section">
                <div className="form-card">
                  <h2 className="form-heading center">Enter Login details</h2>
                  <div className="form-section">
                    <div className="input-group full"><label>Email</label>
                      <div className="effect"><input type="text" name="email" value={email || ''} onChange={handleEmail} /><span></span>
                      </div>
                    </div>

                    <div className="input-group full"><label>Password</label>
                      <div className="effect"><input type="password" name="password" value={password || ''} onChange={handlePassword} /><span></span>
                      </div>
                    </div>
                    {/*state ke auth ke erreormassage ke ander message pda hua hai to use dikhaya*/}
                    {props.authMine?.ErrorMessage?.message ? <div className="input-group full">
                      <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span>
                    </div> : <></>}
                    <div className="form-buttons">
                      <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          }
        </>
      }
    </>


  );
}

const mapStateToProps = (state) => {
  return {
    authMine: state.auth,
    authFirebase: state.firebase.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signIn: (userData) => dispatch(authActions.signIn(userData))
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Login)