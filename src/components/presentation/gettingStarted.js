import React from 'react';
import {skinCodes} from '../../constants/typeCodes';
import * as actionTypes from '../../actions/actionTypes';
import { connect } from 'react-redux';
import * as documentActions from './../../actions/documentActions'
//useHistory router ki property hoti hai reload nhi karta hai lekin isme jo url dalte hai use stack me upar push kar deta hai
//jisse wo load ho jata hai
import { useHistory } from "react-router-dom";
function GettingStarted(props) {
     let history = useHistory();
     const onChange = (skinCd) => {
        //agar ye id pahle se hai to mujhe update karna hai
        if(props.document.id){
             props.updateDocument(skinCd);        
        }
        else{
             props.setDocument(skinCd); 
        }
        history.push('/contact');
      }

      
        return (  
            <div className="container med gettingStarted">
                <div className="section">
                    <h1 className=" center">
                    Select a resume template to get started</h1>
                    <p className=" center">
                    You’ll be able to edit and change this template later!
                    </p>
                    <div className="styleTemplate ">
                    {
                        skinCodes.map((value,index) => {
                            return( <div key={index} className="template-card rounded-border">
                                {/*skin pe map karke agar meri value store pe stored value ke equal aa gyi to to uspe tick mark lga denge
                                maine first skin select kiya ab id aur skincd dono set ho gya ab jab back karta hu to us first 
                                wali  pe tick mark dikhayega ab maine second wale skin ko select kiya to update chalega bas kyuki
                                id pahle se set thi null nhi thi ab back kiya to first ki jagah second wali pe tick dikhayega
                                kyuki skincd skin2 pe set ho gyi hai*/}
                                  <i className={(value == props.document.skinCd? 'selected fa fa-check' :'hide') } ></i>
                                <img  className='' src={'/images/' + value + '.jpg'}/>
                                <button type="button" onClick={()=>onChange(value)}  className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);
    
                        })
                    }
                    </div>
                
                </div>
            </div>
        );
    
}
 const mapStateToProps=(state)=>{
     return {
         //ye karne se pura ka pura document ka data aa jeyega
         document:state.document
     }
 } 
 const mapDispatchToProps = dispatch=>{
     return{
         //hmane uuid bna rakhi hai documentactions.js me to yha se pass karte ki koi zrurat nhi hai
         setDocument:(skinCd)=>dispatch(documentActions.setSkinCd(skinCd)),
         updateDocument:(skinCd)=>dispatch(documentActions.updateSkinCd(skinCd))
     }
 }


export default connect(mapStateToProps,mapDispatchToProps)(GettingStarted)