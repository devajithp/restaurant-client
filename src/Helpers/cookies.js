import cookies from "js-cookie"

export const setCookies=(key,value)=>
{
    cookies.set(key,value,{expires:1})
}
export const getCookie=(key)=>
{
    return cookies.get(key)
}
export const deleteCookie=(key)=>
{
    cookies.remove(key)
}