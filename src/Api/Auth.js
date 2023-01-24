
import axios from "axios"
import { deleteCookie } from "../Helpers/cookies"
import { deleteLocalStorage } from "../Helpers/localStorage"


export const signupAuth=async(data)=>
{
    
   const config={
    headers:{"Content-Type":"application/json"}
   }
   let response= await axios.post("http://localhost:5000/api/auth/signup",data,config)

   return response

}

export const signinAuth= async(data)=>
{
   const config={
      headers:{"Content-Type":"application/json"}
   }
   let response= await axios.post("http://localhost:5000/api/auth/signin",data,config)
   return response
}
export const logout=(next)=>
{
   deleteCookie("token");
   deleteLocalStorage("user")
   next()
}
// /api/auth/signup