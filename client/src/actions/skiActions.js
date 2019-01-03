import {
    GET_SKIS,
    ADD_SKI,
    DELETE_SKI,
    SKIS_LOADING
       } from './types';
import axios from 'axios';

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

/*export const addSki = ski => dispatch=>{
    axios.post('/api/ski',ski).then(res=>
            dispatch({
                type:ADD_SKI,
                payload:res.data  
            })
            )
};*/

export const setSkiLoading = ()=>{
    return {
        type: SKIS_LOADING,
    };
};


