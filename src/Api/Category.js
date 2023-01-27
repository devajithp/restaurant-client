import axios from "axios"
import Cookies from 'js-cookie'
const api="https://brick-red-angler-cape.cyclic.app"
export const createCategory=async (category)=>
{
   
    let data={
        category
    }
    console.log(data)
    const token = Cookies.get("token")
    let config={
        headers: {
            'Content-Type': 'application/json',"token":token
            
          },
          "withCredentials":true
       }
  const response= await axios.post(`${api}/api/category/addCategory`,data,config)
   return response
}

export const getCategories=async ()=>
{
    let config={
        headers: {
            'Content-Type': 'application/json'
            
          },
          "withCredentials":true
       }
  const response= await axios.get(`${api}/api/category/getCategories`,config)
   return response
}


