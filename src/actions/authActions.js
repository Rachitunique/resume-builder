//signin krke user ka email aur password bhejna hai firestore me agar firestore me add hogya aur uuid mil gya user ko to 
//thik hai nhi to error raise hoga
//async action wo hote hai jo time leke thoda kaam hota hai aur event loop ke through chalta hai
import * as actionTypes from './actionTypes';
//ye niche wale tino actions synchronous hai
export const signInRequest =()=>{
    return {type:actionTypes.SIGN_IN_REQUEST}
}

export const signInSuccess = ()=>{
    return {
        type:actionTypes.SIGN_IN_SUCCESS
    }
} 

export const signInFailed = (err)=>{
    return {
    type:actionTypes.SIGN_IN_FAILED,
    error:err

    }
}
export const removeError = ()=>{
    return {type:actionTypes.REMOVE_ERROR}
}

//firebase use karne ke liye apne middleware thunk ka use karenge ham apne data(email & password) 
//ko firestore pe store karenge lekin abhi is function me pas auth ka use karke signin kra rhe hai firebase
//me firestoe ka use nhi kar rhe
export const signIn= (userData)=>{
    //thunk me dispatch ke sath firebase aur firestore bhi send karna hai
    return async(dispatch,getState,obj)=>{
        console.log(obj);
        const {getFirebase,getFirestore} = obj
        dispatch(signInRequest())
        console.log(getFirebase);
        const firebase = getFirebase();
        try{
            let data = await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password);
            dispatch(signInSuccess())
        }
        catch(err)
        {
            dispatch(signInFailed(err))
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
        }

    }
}


export const registerRequest =()=>{
    return {
        type:actionTypes.REGISTER_REQUEST
    }
}
export const registerSuccess = ()=>{
    return {
        type:actionTypes.REGISTER_SUCCESS
    }
}

export const registerFailed = (err)=>{
    return{
        type:actionTypes.REGISTER_FAILED,
        error:err
    }
}

//ab firestore me store karenge email aur resumeId
export const register = (userData)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(registerRequest());
        const firebase = getFirebase();
        const firestore = getFirestore();
        //resumeID is array of objects
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password).then(async(data)=>{
            const res = await firestore.collection('users').doc(data.user.uid).set({
                email:userData.email,
                resumeIds:[]
            });
            dispatch(registerSuccess());
        }).catch((err)=>{
            dispatch(registerFailed(err));
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
        })
    }
}

export function signout(){
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({type:actionTypes.SIGN_OUT})
        }).catch((err)=>{
            dispatch({type:actionTypes.SIGN_OUT_FAILED,error:err})
        })
    }
}