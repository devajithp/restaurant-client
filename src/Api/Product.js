import axios from "axios"


export const createProduct=async (data)=>
{
   console.log(data)
   const config={
    headers:{"Content-Type":"multipart/form-data"},
    "withCredentials":true
   }

    let productData= await axios.post("http://localhost:5000/api/product/addProduct",data,config)

    return productData

}