import {
    GET_SKIS,
    SKIS_LOADING
       } from './types';

export const getskis = (data)=> dispatch=>{
    dispatch(setSkiLoading());
    const skis = data.map(size=>
        size.skis.map(ski=>ski)
    )  
    dispatch({
        type:GET_SKIS,
        payload:skis[0]
    })
         
};



export const setSkiLoading = ()=>{
    return {
        type: SKIS_LOADING,
    };
};


