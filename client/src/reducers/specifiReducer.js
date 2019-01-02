import {
    GET_SPECIFICATION,
    SPECIFI_LOADING
       } from '../actions/types'
const initialState = {
    loading :false,
    specifi:{}
};



export default (state = initialState,action) => {
    switch(action.type){
        case GET_SPECIFICATION:
            return {
                ...state,
                loading:false,
                specifi:action.payload
            }
        case SPECIFI_LOADING:
            return{
                ...state,
                loading:true
            }    
               
        default:
            return state;    
    }
  
}