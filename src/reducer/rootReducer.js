import { combineReducers } from "redux";
import contactReducer from './contactReducer';
import documentReducer from "./documentReducer";
import educationReducer from "./educationReducer";
import authReducer from "./authReducer";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'
import initialState from './initialState.json';
import * as actionTypes from '../actions/actionTypes'
//firebase aur firestore index.js me ReactReduxFirebaseProvider se aaye hai
const appReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    contactSection:contactReducer,
    educationSection: educationReducer,
    document:documentReducer,
    auth:authReducer
})
//appreducer ke pass jane se pahle rootreducer ke pass jayega phir appreducer ke pass jayega access
//ab mai koi bhi action karna chahu to nhi kar paunga kyuki state undefined ho chuka hai 
const rootReducer = (state=initialState,action)=>{
    if(action.type===actionTypes.SIGN_OUT)
    {
        //state is initialstate
        state=undefined;
    }
    return appReducer(state,action)

}
export default rootReducer;