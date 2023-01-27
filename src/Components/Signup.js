import React,{useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg } from '../Helpers/Message';
import { showSuccessMsg } from '../Helpers/Message';
import { signupAuth } from '../Api/Auth';
import { isAuthenticated } from '../Helpers/Auth';



function Signup() {
 const history=useHistory()
 
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
        username:"",
        email:"",
        password:"",
        password2:"",
        successMsg:false,
        errorMsg:false,
        loading:false

    })
    const{username,email,password,password2,successMsg,errorMsg,loading}=formData
   const handleChange=(e)=>
   {
    
    setFormData({...formData,
      errorMsg:false,
      successMsg:false,
    [e.target.name]:e.target.value})
    
    
   }
   const handleSubmit= async (e)=>
   {
    e.preventDefault()
    
    if(isEmpty(username.trim())||isEmpty(email)||isEmpty(password.trim())||isEmpty(password2.trim()))
    {
        setFormData({
          ...formData,errorMsg:"Fields are empty"
        })
    }
    else if(!isEmail(email))
    {
      setFormData({
        ...formData,errorMsg:"invalid email"
      })
    }
    else if(!equals(password,password2))
    {
      setFormData({
        ...formData,errorMsg:"passwords doesn't match"
      })
    }
    else
    {
        setFormData({
          ...formData,loading:true
        })
        const{username,email,password,...rest}=formData
        const data={
          username,
          email,
          password
        }
        

        signupAuth(data).then((res)=>
        {
         
          setFormData({
            ...formData,loading:false,successMsg:res.data.successMessage,username:"",email:"",password:"",password2:""
          })
          

        }).catch((err)=>
        {
        
          setFormData({...formData,loading:false,errorMsg:err.response.data.errorMessage})
        })

        
       

        

    }
   }

    const showSignupForm=()=>
    {
        return(
            <div className='container  '>
               <div className='row vh-100' >
               <div className='col-md-5 mx-auto align-self-center' >
                {successMsg && showSuccessMsg(successMsg)}
               {errorMsg && showErrorMsg(errorMsg)}
                <form onSubmit={handleSubmit} style={{textAlign:"center"}} noValidate>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-user'></i></span>
                  <input onChange={handleChange} name='username' value={username}  type="text" className="form-control  " placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
                  <input onChange={handleChange} name='email' value={email}  type="email" className="form-control  " placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-lock'></i></span>
                  <input onChange={handleChange} name='password' value={password}  type="password" className="form-control  " placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='fa fa-lock'></i></span>
                  <input onChange={handleChange} name='password2' value={password2}  type="password" className="form-control  " placeholder="Confirm password" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div >
                <button style={{fontSize:"20px",width:"150px"}} disabled={loading}  type="submit" className='btn btn-warning'>
                    {loading?<div className="spinner-border" role="status">
                             <span className="sr-only">Loading...</span>
                              </div> :"SignUp"}
                </button>
                <p className='mt-3 text-white'>Already have Account ? <Link className='text-warning' to="/signin">SignIn</Link></p>
                </div>
                </form>
                </div>
                </div> 
                
            </div>
        )
    }
  return (
    <div className='signup'>
      
      { showSignupForm()}
      <p style={{color:"white"}}>{JSON.stringify(formData)}</p>
      
    </div>
  )
}

export default Signup
