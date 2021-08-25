import initialState from './initialState.json';
import * as actionTypes from '../actions/actionTypes';
//authReducer.js ke pass bas auth ka access hai intialstate.json ke , ab
//hame signout karna hai to pura data document, education section aur contact section 
//htana padega store se to isliye ham signout ko rootreducer me handle karte hai kyuki 
//uske pass sabka access hai
export default function authReducer(state=initialState.auth,action){
    switch(action.type){
        case actionTypes.SIGN_IN_FAILED:
            return {...state,loading:false,ErrorMessage:action.error}
        case actionTypes.SIGN_IN_REQUEST:
            return {...state,loading:true}
        case actionTypes.SIGN_IN_SUCCESS:
            return {...state,loading:false}
        case actionTypes.REMOVE_ERROR:
            return {...state,ErrorMessage:''}
        case actionTypes.REGISTER_REQUEST:
            return {...state,loading:true}
        case actionTypes.REGISTER_SUCCESS:
            return {...state,loading:false}
        case actionTypes.REGISTER_FAILED:
            return {...state,loading:false,ErrorMessage:action.error}
        case actionTypes.SIGN_OUT_FAILED:
            return {...state,ErrorMessage:action.error}
        default:
            return state
        
    }
}