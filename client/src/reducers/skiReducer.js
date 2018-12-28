import {
    GET_SKIS,
    ADD_SKI,
    DELETE_SKI,
    SKIS_LOADING
       } from '../actions/types'
const initialState = {
    loading :false,
    skis:[]
};



export default (state = initialState,action) => {
    switch(action.type){
        case GET_SKIS:
            return {
                ...state,
                loading:false,
                skis:action.payload
            }
        case ADD_SKI:
            return{
                ...state,
                skis:[action.payload,...state.skis]  
            }
        case SKIS_LOADING:
            return{
                ...state,
                loading:true
            }    
               
        default:
            return state;    
    }
  
}




