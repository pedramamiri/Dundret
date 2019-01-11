import {
    GET_CHECKOUT,
    CHECKOUT_LOADING
       } from './types';      
import axios from 'axios';

export const getCheckout = ()=> dispatch=>{
    if(sessionStorage.checkout){
        let checkout = JSON.parse(sessionStorage.checkout)
        axios
            .post('/api/skis/checkout',checkout)
            .then(res=>{
                dispatch({
                    type:GET_CHECKOUT,
                    payload:res.data
                })
                
            })
            .catch(err=>console.log(err))
    }
        
};



export const checkoutLoading = ()=>{
    return {
        type: CHECKOUT_LOADING,
    };
};