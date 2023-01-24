
import React,{useState,useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { showErrorMsg } from '../Helpers/Message';
import { showSuccessMsg } from '../Helpers/Message';
import { signinAuth } from '../Api/Auth';
import { setAuthentication,isAuthenticated } from '../Helpers/Auth';



function Signin() {
  const history= useHistory()
  
  useEffect(()=>
  {
    if(isAuthenticated() && isAuthenticated().role===1)
        {
         
          history.push("/admin/dashboard")
        }
        else if(isAuthenticated() && isAuthenticated().role===0)
        {
         
          history.push("/user/dashboard")
        }
      
  },[history])
  const [formData, setFormData]= useState({
    email:"",
    password:"",
    errorMsg:false,
    loading:false,
    

})
const{email,password,successMsg,errorMsg,loading}=formData 
const handleChange=(e)=>
{  

   setFormData({...formData,successMsg:false,errorMsg:false,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>
{
  e.preventDefault()

  if(isEmpty(email.trim())||isEmpty(password.trim()))
  {
    setFormData({...formData,errorMsg:"Fields are empty"})
  }
  else if(!isEmail(email))
  {
    setFormData({...formData,errorMsg:"Invalid email"})
  }
  else
  {
    setFormData({...formData,loading:true})
      signinAuth({email,password}).then((res)=>
      {
        
        setFormData({...formData,loading:false,errorMsg:false})
        setAuthentication(res.data.token,res.data.user)
        
        if(isAuthenticated() && isAuthenticated().role===1)
        {
         
          
          history.push("/admin/dashboard")
        }
        else
        {
          
          
          history.push("/user/dashboard")
        }
         

      }).catch((err)=>
      {
        
        setFormData({...formData,loading:false,errorMsg:err.response.data.errorMessage})
      })
  }
}
   
const showSigninForm=()=>
    {
        return(
            <div className='container  '>
               <div className='row vh-100' >
               <div className='col-md-5 mx-auto align-self-center' >
                {successMsg && showSuccessMsg(successMsg)}
               {errorMsg && showErrorMsg(errorMsg)}
                <form onSubmit={handleSubmit} style={{textAlign:"center"}} noValidate>
                
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
                  <input onChange={handleChange} name='email' value={email}  type="email" className="form-control  " placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-lock'></i></span>
                  <input onChange={handleChange} name='password' value={password}  type="password" className="form-control  " placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                
                <div >
                <button style={{fontSize:"20px",width:"150px"}} disabled={loading}  type="submit" className='btn btn-warning'>
                    {loading?<div className="spinner-border" role="status">
                             <span className="sr-only">Loading...</span>
                              </div> :"SignIn"}
                </button>
                <p className='mt-3 text-white'>new User ? <Link className='text-warning' to="/signup">SignUp</Link></p>
                </div>
                </form>
                </div>
                </div> 
                
            </div>
        )
    }

  return (
    <div className='signin'>
     
      {showSigninForm()}
    </div>
  )
}

export default Signin
