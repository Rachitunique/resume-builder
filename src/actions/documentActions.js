import * as actionTypes from './actionTypes';
const {v4:uuidv4} = require('uuid');

export const setSkinCd = (skinCd)=>{
    let id = uuidv4();
    //document payload hai(actions ke andar bheja ab state pe reflect karana hai)
    return { type:actionTypes.SET_SKIN,document:{skinCd:skinCd,id:id} }
}

//koi new user aane pe agr whi user new SkinCd select kar rha hai to id nhi denge
export const updateSkinCd = (skinCd)=>{
    return {type:actionTypes.UPDATE_SKIN,document:{ skinCd:skinCd}}
}