import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../redux/actions/categoryActions'
import { clear_messages } from '../redux/actions/messageActions'
import { deleteProduct } from '../redux/actions/productActions'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AdminBody() {
    const {categories}= useSelector(state=>state.categories)
    const {products}=useSelector(state=>state.products)
    const {successMessage,errorMessage}= useSelector(state=>state.messages)
  
   const [refresh,setRefresh]=useState(true)
    const[loading,setLoading]=useState(false)
    const[clientErrorMsg,setClientErrorMsg]=useState(false)
    
    const dispatch=useDispatch()
  useEffect(()=>
  {
    dispatch(getCategories())
  },[])
  
 
  // const handleFoodImage=(e)=>
  // {
  //   // setErrorMessage(false)
  //   setClientErrorMsg(false)
  //   dispatch(clear_messages())
  //   let imageData= new FormData()
  //   imageData.append("file",e.target.files[0])
  //   imageData.append("upload_preset",'hryarpdg')
  //   const config = {
  //     headers: {
  //       "Content-type": "multipart/form-data",
  //     }
  //   }

  //   axios.post("https://api.cloudinary.com/v1_1/dw7fovacw/image/upload",imageData,config).then((res)=>
  //   {
  //     console.log(res.data.secure_url)
        
  //     setProductData({...productData,[e.target.name]:res.data.secure_url})
  //   })
    
    
  // }
 
  
 

  
  return (
   
    <div className='container'>
        <div className='row align-items-center'>
            
          
        
      
      {
        products && products.map((product)=>
        {
          
            return(
              
            <div key={product._id} className="card col-md-2  text-center" style={{width:"300px", height:"450px",marginLeft:"15px",marginTop:"10px"}} >
              
                <img className="card-img-top" style={{width:"180px", height:"150px", margin:"auto"}} src={`${product.productImage}`} alt="Card image cap"></img>
                
                <div className="">
                  <h5 className="card-title">{product.productName}</h5>
                  <hr></hr>
                  <h6 className="card-text">{product.productCategory.category}</h6>
                  <p className="card-text">{product.productDescription}</p>
                  <p className="card-text">Available :{product.productQty}</p>
                  <p className="card-text">Price :{product.productPrice}</p>
                  <div>
                  <Link to={`/admin/edit/product/${product._id}`}    style={{marginRight:"5px",}}   className="btn btn-secondary btn-sm"><i className="fas fa-edit"></i> Edit</Link>
                  <button onClick={()=>{
                    if(window.confirm(`Are you sure you want to delete ${product.productName}`))
                    {
                      dispatch(deleteProduct(product._id))
                    }
                    }} style={{marginLeft:"5px"}}  className="btn btn-danger btn-sm"><i style={{color:"black"}} className="fa fa-trash"></i> Delete</button>
                  </div>
                  <br></br>
                    
                </div>
              </div>
              
              
              
            )
        })
      }
      
      </div>
    </div>
    
  
  )
}

export default AdminBody
