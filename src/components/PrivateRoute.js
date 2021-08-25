import React from 'react'
import {Route,Redirect} from 'react-router-dom';
//ye check karta hai ki mera user logged in hai ya nhi hai
import {isLoaded,isEmpty} from 'react-redux-firebase';
// similar to mapStateToProps but isme deepcomparison hota hai usme shallow comparison hota hai
import {useSelector} from 'react-redux'
//aisa reels ke privateroute me kiya tha
//private route taki user signed in nhi hai to use different routes assecible nhi ho
function PrivateRoute({component:Component,...remainingProps}) {
const authFirebase = useSelector(state=>state.firebase.auth)
    return (
       <Route {...remainingProps} 
       //render csllback hai jisme ham browserrouter ke props jaise history,location wagehra wale props pass karte hai
       render={({props})=>
       //agar auth firebase loaded hai aur empty nhi hai to apna component render kra diya aur isme props(history wagehra)
       // pass kra diya 
       isLoaded(authFirebase) && !isEmpty(authFirebase) ?
       (<Component {...props}/>):(<Redirect to='/'/>)
    }
    />
    )
}

export default PrivateRoute