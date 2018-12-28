import {
    GET_SKIS,
    ADD_SKI,
    DELETE_SKI,
    SKIS_LOADING
       } from './types';
import axios from 'axios';

export const getskis = ()=> dispatch=>{
    dispatch(setSkiLoading());
    axios
        .get('/api/skis')
        .then(res=>
            dispatch({
                type:GET_SKIS,
                payload:res.data
            })
            )
};

export const addSki = ski => dispatch=>{
    axios.post('/api/ski',ski).then(res=>
            dispatch({
                type:ADD_SKI,
                payload:res.data  
            })
            )
};

export const setSkiLoading = ()=>{
    return {
        type: SKIS_LOADING,
    };
};


