import axios from "axios"


export const createCategory=async (category)=>
{
   
    let data={
        category
    }
    console.log(data)
    let config={
        headers: {
            'Content-Type': 'application/json'
            
          },
          "withCredentials":true
       }
  const response= await axios.post("http://localhost:5000/api/category/addCategory",data,config)
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
  const response= await axios.get("http://localhost:5000/api/category/getCategories",config)
   return response
}


