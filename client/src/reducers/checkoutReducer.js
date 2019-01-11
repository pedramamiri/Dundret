import {
    GET_CHECKOUT,
    CHECKOUT_LOADING
       } from '../actions/types'
const initialState = {
    loading :false,
    checkout:[]
};



export default (state = initialState,action) => {
    switch(action.type){
        case GET_CHECKOUT:
            return {
                ...state,
                loading:false,
                checkout:action.payload
            }  
        case CHECKOUT_LOADING:
            return{
                ...state,
                loading:true
            }    
               
        default:
            return state;    
    }
  
}