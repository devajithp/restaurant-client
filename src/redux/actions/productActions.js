import {SHOW_ERROR_MESSAGE,SHOW_SUCCESS_MESSAGE} from "../constants/messageConstants"
import { STOP_LOADING,START_LOADING } from "../constants/loadingConstants"
import { CREATE_PRODUCT, GET_PRODUCTS,DELETE_PRODUCT,GET_PRODUCT } from "../constants/productConstants"
import Cookies from 'js-cookie'

import axios from "axios"
const api="https://brick-red-angler-cape.cyclic.app"
export const createProduct=(data)=>async dispatch=>
{
    
    const token = Cookies.get("token")
    const config={
     headers:{"Content-Type":"application/json","token":token},
     "withCredentials":true
    }
    try {
        dispatch({type:START_LOADING})
        let productData= await axios.post(`${api}/api/product/addProduct`,data,config)
        dispatch({type:CREATE_PRODUCT,payload:productData.data})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:productData.data.productName})
        dispatch({type:STOP_LOADING})
    } catch (error) {
        console.log(error)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})  
    }
    
     
 
   
}
export const getProducts=()=>async dispatch=>
{
    try {
        const products=await axios.get(`${api}/api/product/getProducts`)
        dispatch({type:GET_PRODUCTS,payload:products.data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct=(id)=>async dispatch=>
{
    try {
        const token = Cookies.get("token")
        const config={
            headers:{"Content-Type":"application/json","token":token},
            "withCredentials":true
           }
        const deletedProduct=await axios.delete(`${api}/api/product/deleteProduct/${id}`,config)
        dispatch({type:DELETE_PRODUCT,payload:deletedProduct.data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage}) 
    }
}
export const getProduct=(id)=>async dispatch=>
{
    try{
       
        const product= await axios.get(`${api}/api/product/getProduct/${id}`)
        dispatch({type:GET_PRODUCT,payload:product.data})
    }
    catch(error)
    {
        console.log(error)
    }
}