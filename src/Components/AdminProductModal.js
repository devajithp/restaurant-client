
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
// import { getCategories } from "../Api/Category"
import { getCategories } from '../redux/actions/categoryActions'
import { clear_messages } from '../redux/actions/messageActions'
// import { createProduct } from '../Api/Product'
import { createProduct } from '../redux/actions/productActions'
function AdminProductModal() {
  const dispatch=useDispatch()
  // const [errorMessage,setErrorMessage]=useState(false)
  // const [successMessage,setSuccessMessage]=useState(false)
  const [clientErrorMsg,setClientErrorMsg]=useState(false)
  const [loading,setLoading]=useState(false)
  const [imgUrl,setImgUrl]=useState("")
  // const [categories,setCategories]=useState()
  const [refresh,setRefresh]=useState()
  const [productData,setProductData]=useState({
    productName:"",
    productDescription:"",
    productPrice:"",
    productCategory:"",
    productQty:"",
    productImage:""
  })
  // redux global state
  const {successMessage,errorMessage}= useSelector(state=>state.messages)
  const {categories}=useSelector(state=>state.categories)
  
   const{productName,productDescription,productPrice,productCategory,productQty,productImage}=productData

  useEffect(()=>
  {
    dispatch(getCategories())
    // getCategories().then((categories)=>
    // {
      
      
    //   setCategories([...categories.data])
    // })
  },[refresh,productData])
  //event handlers
  const handleMessage=()=>
  {
    // setSuccessMessage(false)
    // setErrorMessage(false)
    setClientErrorMsg(false)
    dispatch(clear_messages())
    
    setProductData({...productData, productName:"",
    productDescription:"",
    productPrice:"",
    productCategory:"",
    productQty:"",
    productImage:""})
  }
  const handleFoodChange=(e)=>{ 
    // setErrorMessage(false)
    // setSuccessMessage(false)
    setClientErrorMsg(false)
    dispatch(clear_messages())
    
    setProductData({...productData,[e.target.name]:e.target.value})
    
  }
  const handleFoodImage=(e)=>
  {
    // setErrorMessage(false)
    setClientErrorMsg(false)
    dispatch(clear_messages())
    let imageData= new FormData()
    imageData.append("file",e.target.files[0])
    imageData.append("upload_preset",'hryarpdg')
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      }
    }

    axios.post("https://api.cloudinary.com/v1_1/dw7fovacw/image/upload",imageData,config).then((res)=>
    {
      
        
      setProductData({...productData,[e.target.name]:res.data.secure_url})
    })
    
    
  }
  const handleFoodSubmit=(e)=>
  {
    e.preventDefault();
    
    if(productName.trim()===""||productDescription.trim()===""||productCategory.trim()===""||productPrice.trim()===""||productQty.trim()==="")
    {
      setClientErrorMsg("fill all fields")
    }
    else if(productImage.trim()==="")
    {
      setClientErrorMsg("please select an image")
    }
    else
    {
      setLoading(true)
      
      // let formData= new FormData();

      // formData.append("productName",productName)
      // formData.append("productDescription",productDescription)
      // formData.append("productPrice",productPrice)
      // formData.append("productCategory",productCategory)
      // formData.append("productQty",productQty)
      // formData.append("productImage",productImage)
      let formData={
          ...productData
      }

      dispatch(createProduct(formData))
      setLoading(false)
         setProductData({...productData,
          productName:"",
          productDescription:"",
          productPrice:"",
          productCategory:"",
          productQty:"",
          productImage:""})

      // createProduct(formData).then((res)=>
      // {
      //   console.log(res.data)
      //   setLoading(false)
      //   setSuccessMessage(res.data.productName)
      //   setProductData({...productData,
      //     productName:"",
      //     productDescription:"",
      //     productPrice:"",
      //     productCategory:"",
      //     productQty:"",
      //     productImage:null})
      // }).catch((err)=>
      // {
      //   console.log(err)
      //   setLoading(false)
      // })
       
    }
  }
  const handleCategoryRefresh=()=>
  {
     if(refresh)
     {
        setRefresh(false)
     }
     else
     {
        setRefresh(true)
     }
  }

  return (
    <div id="addFoodModal" className='modal' >
        <div className='modal-dialog modal-dialog-centered modal-lg '>
      
      <div className='modal-content'>
      
        <div className='modal-header text-center bg-warning text-white'>
        
         <h5 className='modal-title'>Add Food</h5>
         
         <button onClick={handleMessage} className='modal-close btn' data-bs-dismiss="modal"><span><i  className='fas fa-times' ></i></span></button>
        </div>
        <form onSubmit={handleFoodSubmit} encType="multipart/form-data">
        <div className='modal-body my-3'>
        {clientErrorMsg && <div className="alert alert-danger" role="alert">
           {clientErrorMsg}
         </div>} 
        {errorMessage && <div className="alert alert-danger" role="alert">
           {errorMessage}
         </div>}
         {successMessage && <div className="alert alert-success" role="alert">
           {successMessage} was added!
         </div>}
            
            <label className='text-secondary'>Food</label>
            <input value={productName} onChange={handleFoodChange} name='productName'   className='form-control' type="text"></input>
            <label className='text-secondary'>Description</label>
            <textarea value={productDescription} onChange={handleFoodChange} name='productDescription'   className='form-control' type="text"></textarea>
            <label className='text-secondary'>Price</label>
            <input value={productPrice} onChange={handleFoodChange} name='productPrice'   className='form-control' type="number" min="0" max="10000"></input>
            <div className='row'>
            <div className='col-md-6'>
            <label className='text-secondary'>Category</label>
            <select onClick={handleCategoryRefresh} value={productCategory} name='productCategory' onChange={handleFoodChange} className="form-select" aria-label="Default select example">
              <option value="" selected>choose one</option>

              {
               categories && categories.map((category)=>
                { return(<option key={category._id} value={category._id}>{category.category}</option>)
                  
                })
              }
            </select>
            </div>
            <div className='col-md-6'>
            <label className='text-secondary'>Quantity</label>
            <input onChange={handleFoodChange} name='productQty' value={productQty}   className='form-control' type="number" min="0" max="1000"></input>
            </div>
            </div><br></br>
           
            <div className="custom-file">
            <input name='productImage' onChange={handleFoodImage} type="file"  />
            
            </div>
            
         
        </div>
        <div className='modal-footer'>
          {/* <button onClick={handleMessage} data-bs-dismiss="modal" className='bg-secondary btn'>close</button> */}
          <button disabled={loading} type='submit' className='bg-warning btn'>{loading?<div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
          </div>:"Submit"}</button>

        </div>
        </form>
      </div>
    </div>
      </div>
  )
}

export default AdminProductModal
