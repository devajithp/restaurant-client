import React, { useEffect} from 'react'
// import { createCategory,getCategories } from "../Api/Category"
// import { createProduct } from '../Api/Product'
import AdminHeader from './AdminHeader'
import AdminActionBtns from './AdminActionBtns'
import AdminCategoryModel from './AdminCategoryModel'
import AdminProductModal from './AdminProductModal'
import AdminBody from './AdminBody'
import { useSelector,useDispatch } from 'react-redux'
import { getCategories } from '../redux/actions/categoryActions'
import { getProducts } from '../redux/actions/productActions'


function AdminDashboard() {
  const dispatch= useDispatch()
  const categories= useSelector(state=>state.categories)
  const products=useSelector(state=>state.products)
  useEffect(()=>
  {
    dispatch(getCategories())
    dispatch(getProducts())

  },[dispatch])

  // const [category,setCategory]=useState("")
  // const [error,setError]=useState(false)
  // const [success,setSuccess]=useState(false)
  // const [loading,setLoading]=useState(false)
  // const [categories,setCategories]=useState()
  // const [productData,setProductData]=useState({
  //   productName:"",
  //   productDescription:"",
  //   productPrice:"",
  //   productCategory:"",
  //   productQty:"",
  //   productImage:null
  // })
  
  //  const{productName,productDescription,productPrice,productCategory,productQty,productImage}=productData

  // useEffect(()=>
  // {
    
  //   getCategories().then((categories)=>
  //   {
      
      
  //     setCategories([...categories.data])
  //   })
  // },[loading])
  // //event handlers
  // const handleMessage=()=>
  // {
  //   setSuccess(false)
  //   setError(false)
    
  //   setProductData({...productData, productName:"",
  //   productDescription:"",
  //   productPrice:"",
  //   productCategory:"",
  //   productQty:"",
  //   productImage:null})
  // }
  // const handleCategoryChange= async (e)=>
  // { setSuccess(false)
  //   setError(false)
  //   setCategory(e.target.value)
    
  // }
  // const handleCategorySubmit=async(e)=>
  // {
  //   e.preventDefault()
  //   if(category.trim()==="")
  //   {
  //    setError("enter category")
  //   }
  //   else
  //   {
  //     setLoading(true)
  //     setError(false)
  //    createCategory(category).then((res)=>
  //    {
      
  //     setSuccess(res.data.category)
  //     setLoading(false)
  //     setCategory("")
  //    }).catch((err)=>
  //    {
      
  //     setError(err.response.data.errorMessage)
  //     setLoading(false)
  //     setCategory("")
  //    })
     
      
  //   }

  // }
  // const handleFoodChange=(e)=>
  // { setError(false)
  //   setSuccess(false)
  //   setProductData({...productData,[e.target.name]:e.target.value})
    
  // }
  // const handleFoodImage=(e)=>
  // {
  //   setError(false)
  //   setProductData({...productData,[e.target.name]:e.target.files[0]})
    
  // }
  // const handleFoodSubmit=(e)=>
  // {
  //   e.preventDefault();
    
  //   if(productName.trim()===""||productDescription.trim()===""||productCategory.trim()===""||productPrice.trim()===""||productQty.trim()==="")
  //   {
  //     setError("fill all fields")
  //   }
  //   else if(productImage===null)
  //   {
  //     setError("please select an image")
  //   }
  //   else
  //   {
  //     setLoading(true)
  //     console.log("done")
      
  //     let formData= new FormData();

  //     formData.append("productName",productName)
  //     formData.append("productDescription",productDescription)
  //     formData.append("productPrice",productPrice)
  //     formData.append("productCategory",productCategory)
  //     formData.append("productQty",productQty)
  //     formData.append("productImage",productImage)

      
  //     createProduct(formData).then((res)=>
  //     {
  //       console.log(res.data)
  //       setLoading(false)
  //       setSuccess(res.data.productName)
  //       setProductData({...productData,
  //         productName:"",
  //         productDescription:"",
  //         productPrice:"",
  //         productCategory:"",
  //         productQty:"",
  //         productImage:null})
  //     }).catch((err)=>
  //     {
  //       console.log(err)
  //       setLoading(false)
  //     })
       
  //   }
  // }
  // //views
  // const showCategoryModal=()=>
  // {
  //   return(
  //   <div id='addCategoryModal' className='modal' onClick={handleMessage}>
      
  //     <div className='modal-dialog modal-dialog-centered modal-lg '>
      
  //       <div className='modal-content'>
        
  //         <div className='modal-header text-center bg-info text-white'>
          
  //          <h5 className='modal-title'>Add Category</h5>
           
  //          <button onClick={handleMessage} className='modal-close btn' data-bs-dismiss="modal"><span><i  className='fas fa-times' ></i></span></button>
  //         </div>
  //         <form onSubmit={handleCategorySubmit}>
  //         <div className='modal-body my-3'>
  //         {error && <div className="alert alert-danger" role="alert">
  //            {error}
  //          </div>}
  //          {success && <div className="alert alert-success" role="alert">
  //            {success} was created!
  //          </div>}
  //             <label className='text-secondary'>Category</label>
  //             <input onChange={handleCategoryChange} name='category' value={category} className='form-control' type="text"></input>
           
  //         </div>
  //         <div className='modal-footer'>
  //           {/* <button onClick={handleMessage} data-bs-dismiss="modal" className='bg-secondary btn'>close</button> */}
  //           <button disabled={loading} type='submit' className='bg-info btn'>{loading?<div className="spinner-border" role="status">
  //           <span class="sr-only">Loading...</span>
  //           </div>:"Submit"}</button>

  //         </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  //   )
  // }
  // const showFoodModal=()=>
  // {
  //   return(
  //     <div id="addFoodModal" className='modal' >
  //       <div className='modal-dialog modal-dialog-centered modal-lg '>
      
  //     <div className='modal-content'>
      
  //       <div className='modal-header text-center bg-warning text-white'>
        
  //        <h5 className='modal-title'>Add Food</h5>
         
  //        <button onClick={handleMessage} className='modal-close btn' data-bs-dismiss="modal"><span><i  className='fas fa-times' ></i></span></button>
  //       </div>
  //       <form onSubmit={handleFoodSubmit} encType="multipart/form-data">
  //       <div className='modal-body my-3'>
  //       {error && <div className="alert alert-danger" role="alert">
  //          {error}
  //        </div>}
  //        {success && <div className="alert alert-success" role="alert">
  //          {success} was added!
  //        </div>}
            
  //           <label className='text-secondary'>Food</label>
  //           <input value={productName} onChange={handleFoodChange} name='productName'   className='form-control' type="text"></input>
  //           <label className='text-secondary'>Description</label>
  //           <textarea value={productDescription} onChange={handleFoodChange} name='productDescription'   className='form-control' type="text"></textarea>
  //           <label className='text-secondary'>Price</label>
  //           <input value={productPrice} onChange={handleFoodChange} name='productPrice'   className='form-control' type="number" min="0" max="10000"></input>
  //           <div className='row'>
  //           <div className='col-md-6'>
  //           <label className='text-secondary'>Category</label>
  //           <select value={productCategory} name='productCategory' onChange={handleFoodChange} className="form-select" aria-label="Default select example">
  //             <option value="" selected>choose one</option>

  //             {
  //              categories && categories.map((category)=>
  //               { return(<option key={category._id} value={category._id}>{category.category}</option>)
                  
  //               })
  //             }
  //           </select>
  //           </div>
  //           <div className='col-md-6'>
  //           <label className='text-secondary'>Quantity</label>
  //           <input onChange={handleFoodChange} name='productQty' value={productQty}   className='form-control' type="number" min="0" max="1000"></input>
  //           </div>
  //           </div><br></br>
           
  //           <div className="custom-file">
  //           <input name='productImage' onChange={handleFoodImage} type="file"  />
            
  //           </div>
            
         
  //       </div>
  //       <div className='modal-footer'>
  //         {/* <button onClick={handleMessage} data-bs-dismiss="modal" className='bg-secondary btn'>close</button> */}
  //         <button disabled={loading} type='submit' className='bg-warning btn'>{loading?<div className="spinner-border" role="status">
  //         <span class="sr-only">Loading...</span>
  //         </div>:"Submit"}</button>

  //       </div>
  //       </form>
  //     </div>
  //   </div>
  //     </div>
  //   )
  // }
  return (
    <section>
      <AdminHeader></AdminHeader>
      
      <AdminActionBtns></AdminActionBtns>
      <AdminBody ></AdminBody>
      
      <AdminCategoryModel></AdminCategoryModel>
      {/* {showCategoryModal()} */}
      <AdminProductModal></AdminProductModal>
      {/* {showFoodModal()} */}
      
    </section>
  )
}

export default AdminDashboard

