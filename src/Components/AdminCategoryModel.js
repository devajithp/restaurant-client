import React,{useState} from 'react'
// import { createCategory} from "../Api/Category"
//redux
import {useDispatch,useSelector} from "react-redux"
import { clear_messages } from '../redux/actions/messageActions'
import { createCategory } from '../redux/actions/categoryActions'
import { SHOW_ERROR_MESSAGE,SHOW_SUCCESS_MESSAGE } from '../redux/constants/messageConstants'

function AdminCategoryModel() 
{
  const dispatch=useDispatch()
const [category,setCategory]=useState("")
  // const [errorMessage,setErrorMessage]=useState(false)
  // const [successMessage,setSuccessMessage]=useState(false)
  const [loading,setLoading]=useState(false)
  const [clientErrorMsg,setClientErrorMsg]=useState(false)
  
  //redux global states
  const {successMessage,errorMessage}= useSelector(state=>state.messages)

  const handleMessage=()=>
  {
    // setSuccessMessage(false)
    setClientErrorMsg(false)
    dispatch(clear_messages())

    
    setLoading(false)
    
  }
  const handleCategoryChange= async (e)=> { 
    // setSuccessMessage(false)
  setClientErrorMsg(false)
  dispatch(clear_messages())
    
    setCategory(e.target.value)
    
  }
  const handleCategorySubmit=async(e)=>
  {
    e.preventDefault()
    if(category.trim()==="")
    {
      setClientErrorMsg("enter category")
     
    }
    else
    {
      setLoading(true)
      dispatch(clear_messages())
    //  createCategory(category).then((res)=>
    //  {
      
    //   setSuccessMessage(res.data.category)
    //   setLoading(false)
    //   setCategory("")
    //  }).catch((err)=>
    //  {
      
    //   setErrorMessage(err.response.data.errorMessage)
    //   setLoading(false)
    //   setCategory("")
    //  })
     dispatch(createCategory(category))
     setLoading(false)
     setCategory("")
      
    }

  }
  return (
    <div id='addCategoryModal' className='modal' onClick={handleMessage}>
      
      <div className='modal-dialog modal-dialog-centered modal-lg '>
      
        <div className='modal-content'>
        
          <div className='modal-header text-center bg-info text-white'>
          
           <h5 className='modal-title'>Add Category</h5>
           
           <button onClick={handleMessage} className='modal-close btn' data-bs-dismiss="modal"><span><i  className='fas fa-times' ></i></span></button>
          </div>
          <form onSubmit={handleCategorySubmit}>
          <div className='modal-body my-3'>
          {clientErrorMsg && <div className="alert alert-danger" role="alert">
             {clientErrorMsg}
           </div>}
          {errorMessage && <div className="alert alert-danger" role="alert">
             {errorMessage}
           </div>}
           {successMessage && <div className="alert alert-success" role="alert">
             {successMessage} was created!
           </div>}
              <label className='text-secondary'>Category</label>
              <input onChange={handleCategoryChange} name='category' value={category} className='form-control' type="text"></input>
           
          </div>
          <div className='modal-footer'>
            {/* <button onClick={handleMessage} data-bs-dismiss="modal" className='bg-secondary btn'>close</button> */}
            <button disabled={loading} type='submit' className='bg-info btn'>{loading?<div className="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>:"Submit"}</button>

          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminCategoryModel
