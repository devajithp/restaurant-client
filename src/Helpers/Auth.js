
import { setCookies,getCookie } from "./cookies";
import { setLocalStorage,getLocalStorage } from "./localStorage";

export const setAuthentication=(token,user)=>
{
    setCookies("token",token)
    setLocalStorage("user",user)
}
export const isAuthenticated=()=>
{
    
      if(getCookie("token") && getLocalStorage("user") )
      {
        return getLocalStorage("user")
      }
      else
      {
        return false
      }
}