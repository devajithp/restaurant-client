
import axios from "axios"
import { deleteCookie } from "../Helpers/cookies"
import { deleteLocalStorage } from "../Helpers/localStorage"


const api="https://brick-red-angler-cape.cyclic.app"
export const signupAuth=async(data)=>
{
    
   const config={
    headers:{"Content-Type":"application/json"},
    "withCredentials": true
   }
   let response= await axios.post(`${api}/api/auth/signup`,data,config)

   return response

}

export const signinAuth= async(data)=>
{
   const config={
      headers:{"Content-Type":"application/json"},
      "withCredentials": true
   }
   let response= await axios.post(`${api}/api/auth/signin`,data,config)
   return response
}
export const logout=(next)=>
{
   deleteCookie("token");
   deleteLocalStorage("user")
   next()
}
// /api/auth/signup