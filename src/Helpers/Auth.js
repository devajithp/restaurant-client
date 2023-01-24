
import { setCookies,getCookie } from "./cookies";
import { setLocalStorage,getLocalStorage } from "./localStorage";

export const setAuthentication=(token,user)=>
{
    setCookies("token",token)
    setLocalStorage("user",user)
}
export const isAuthenticated=()=>
{
    console.log(getCookie("token"))
    console.log(getLocalStorage("user"))
      if(getCookie("token") && getLocalStorage("user") )
      {
        return getLocalStorage("user")
      }
      else
      {
        return false
      }
}