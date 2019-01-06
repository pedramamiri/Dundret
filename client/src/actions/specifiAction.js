import {
    GET_SPECIFICATION,
    SPECIFI_LOADING
       } from './types';

export const getSpecifi = (data)=> dispatch=>{
    dispatch(specifiLoading());
    
    dispatch({
        type:GET_SPECIFICATION,
        payload:data
    })           
};



export const specifiLoading = ()=>{
    return {
        type: SPECIFI_LOADING,
    };
};