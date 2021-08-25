import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer';
//firebase gives authantication aur uska object store karne ke liye firestore
//ab jo firebase me authentication hai use mai redux store me rakhta hu
//to mai vha se auth ki current state nikal sakta hu
//thunk function return karta tha jo ki object deta tha phir
//lekin hame is case me thunk ke sath firebase aur firestore bhi 
//bhejna padega(kyuli user ka umique id firestore me store karana hai)
//firebase se auth ki
//see example in copy 
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
//if we don't need firestore remove below
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'
var firebaseConfig = {
  apiKey: "AIzaSyAukncv0SM-3aRl1oMF12ynBuXtOXdRPW4",
  authDomain: "resume-builder-4272c.firebaseapp.com",
  projectId: "resume-builder-4272c",
  storageBucket: "resume-builder-4272c.appspot.com",
  messagingSenderId: "88485197",
  appId: "1:88485197:web:0b9fca2003dfa847435b04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

//creating redux store
//may see store.js in redux demo
const reduxStore = createStore(rootReducer,
  //chrome ke ander jo extension dali thi jisse state wagehra dikh rhi th wo dikh jayegi
  composeWithDevTools(
    //yha thunk ke sath firebase aur firestore extra argument bhi bhej rhe hai
    //pahle thunk ke sath bas dispatch pass hota tha 
    //isse thunk ke ander firebase or firestore ke instances create karne ki capability aa jayegi
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    //getFireStore ko chalane ke liye reduxFirestore(firebase) dependency hai matlab getfirestore chalana hai to reduxfirestore ka use hoga
    reduxFirestore(firebase) // redux bindings for firestore,  
  )
);

//browser router se sabko routing capability milti hai
ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    {/*is wrapper se mujhe firebase aur firestore ke instances mil jayenge redux ke store ke ander*/}
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}
      >
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);