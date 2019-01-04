import {
    GET_SIZES,
    SIZES_LOADING
       } from './types';
import { getskis } from './skiActions';        
import axios from 'axios';

export const getSizes = (specifi)=> dispatch=>{
    dispatch(setSizesLoading());
    axios
        .post('/api/skis/search',specifi)
        .then(res=>{
            dispatch({
                type:GET_SIZES,
                payload:res.data
            })
            dispatch(getskis(res.data))
        })
        .catch(err=>console.log(err))
        
};



export const setSizesLoading = ()=>{
    return {
        type: SIZES_LOADING,
    };
};