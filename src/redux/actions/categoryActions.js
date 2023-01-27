import {START_LOADING,STOP_LOADING} from "../constants/loadingConstants"
import {SHOW_ERROR_MESSAGE,SHOW_SUCCESS_MESSAGE} from "../constants/messageConstants"
import {GET_CATEGORIES,CREATE_CATEGORY} from "../constants/categoryConstants"
import Cookies from 'js-cookie'

import axios from "axios"
const api="https://brick-red-angler-cape.cyclic.app"
export const getCategories=()=>async dispatch=>{

    let config={
        headers: {
            'Content-Type': 'application/json'
            
          },
          "withCredentials":true
       }

       try {
        dispatch({type:START_LOADING})
        const response= await axios.get(`${api}/api/category/getCategories`,config)
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_CATEGORIES,payload:response.data.categories})
       
       } catch (error) {
        
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
       }
  
}
export const createCategory= (category)=>async dispatch=>
{
   
    let data={
        category
    }
    const token = Cookies.get("token")
    let config={
        headers: {
            'Content-Type': 'application/json',"token":token
            
          },
          "withCredentials":true
       }
       try {
        
        const response= await axios.post(`${api}/api/category/addCategory`,data,config)
        
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:response.data.category})
        dispatch({type:CREATE_CATEGORY,payload:response.data.category})
       } catch (error) {
       
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
       }
  
   
}

