import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/actions/productActions'
import { EDIT_PRODUCT, EMPTY_PRODUCT, GET_PRODUCT } from '../redux/constants/productConstants'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function AdminEditProduct(props) {
   
    const history=useHistory()
    const productId=props.match.params.id
   
    const dispatch=useDispatch()
   
    const product=useSelector(state=>state.products.product) 
    useEffect(()=>
    {
       dispatch(getProduct(productId))
      
       
       
    },[dispatch])

    
    console.log(product)
    // const{productCategory,productDescription,productImage,productName,productPrice,productQty,...rest}=product
    const [productData,setProductData]=useState({...product})
    
    const handleImage=(e)=>
    {
      console.log(e.target.files[0])
      const imageData=new FormData()
      imageData.append("file",e.target.files[0])
      imageData.append("upload_preset","hryarpdg")
      const config={
        headers:{"Content-Type":"multipart/form-data"}
      }
      axios.post("https://api.cloudinary.com/v1_1/dw7fovacw/image/upload",imageData,config).then((res)=>
      {
        console.log(res.data.secure_url)
        
         setProductData({
          ...product,
          ...productData,
          productImage:res.data.secure_url
         })
      
       
      })
    }
    const handleChange=(e)=>
    { 
      setProductData({
        ...product,
        ...productData,
        [e.target.name]:e.target.value,
      })
      
      
    }
    const handleSubmit=(e)=>
    {
      e.preventDefault()
      if(productData.productName.trim()===""||productData.productDescription.trim()===""||productData.productPrice===""||productData.productQty==="")
      {
        console.log("fill all fields")
      }
      else{

        const config={
          headers:{"Content-Type":"application/json"},
          "withCredentials":true
        }
        axios.patch(`http://localhost:5000/api/product/editProduct/${productId}`,productData,config).then((res)=>
        {
            console.log(res.data)
            dispatch({
              type:EDIT_PRODUCT,
              payload:res.data
            })
           dispatch({
            type:EMPTY_PRODUCT
           })
           
           history.push("/admin/dashboard")
        })
        
      }
      
    
      
    }
  return (
    <div className='container'>
      <h3 style={{marginTop:"10px"}}>Edit Product</h3>
      <div className='row'>
      <div className='col-md-6'>
      {
        product && <div>
          <form >
        <div style={{marginTop:"10px"}} className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input name="productName" onChange={handleChange} style={{maxWidth:"800px"}} defaultValue={product.productName} type="text" className="form-control"  aria-describedby="emailHelp" placeholder=""></input>
          
        </div>
        <div style={{marginTop:"10px"}} className="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input name='productPrice' onChange={handleChange} style={{maxWidth:"800px"}} defaultValue={product.productPrice}  type="number" className="form-control"  placeholder=""></input>
        </div>
        <div style={{marginTop:"10px"}} className="form-group">
          <label>Description</label>
          <input name="productDescription" onChange={handleChange} style={{maxWidth:"800px"}} defaultValue={product.productDescription}  type="text" className="form-control" ></input>
         
        </div>
        <div style={{marginTop:"10px"}} className="form-group">
          <label>Quantity</label>
          <input name="productQty" onChange={handleChange} style={{maxWidth:"800px"}} defaultValue={product.productQty}  type="number" className="form-control" ></input>
         
        </div>
        <div style={{marginTop:"10px"}}>
          <img alt='foodImage' style={{maxHeight:"200px",maxHeight:"200px"}} src={productData.productImage||product.productImage}></img>
        </div>
        <div style={{marginTop:"10px"}}>
          <input onChange={handleImage} type="file"></input>
        </div>
        <button onClick={handleSubmit} style={{marginTop:"10px"}} type="button" className="btn btn-primary">Save Changes</button>
      </form></div>
      }
      </div>
      </div>
    </div>
  )
}

export default AdminEditProduct
