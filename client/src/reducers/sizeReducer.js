import {
    GET_SIZES,
    SIZES_LOADING
       } from '../actions/types'
const initialState = {
    loading :false,
    sizes:[]
};



export default (state = initialState,action) => {
    switch(action.type){
        case GET_SIZES:
            return {
                ...state,
                loading:false,
                sizes:action.payload
            }
        case SIZES_LOADING:
            return{
                ...state,
                loading:true
            }    
               
        default:
            return state;    
    }
  
}