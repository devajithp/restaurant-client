import axios from "axios"
import Cookies from 'js-cookie'
const api="https://brick-red-angler-cape.cyclic.app"
export const createProduct=async (data)=>
{
   console.log(data)
   const token = Cookies.get("token")
   const config={
    headers:{"Content-Type":"multipart/form-data","token":token},
    "withCredentials":true
   }

    let productData= await axios.post(`${api}/api/product/addProduct`,data,config)

    return productData

}