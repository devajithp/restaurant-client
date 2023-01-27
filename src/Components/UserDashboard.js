import React, { useEffect, useState } from 'react'



import axios from 'axios'
import Cookies from 'js-cookie'

function UserDashboard() {
   
  const api="https://brick-red-angler-cape.cyclic.app"
   const[products,setProducts]=useState()
   const[categories,setCategories]=useState()
   const[catProducts,setCatProducts]=useState()
   const[query,setQuery]=useState("")
   const[categorySelect,setCategorySelect]=useState("select category")
   
   useEffect(()=>
   {
      
      axios.get(`${api}/api/product/getProducts`).then((res)=>
      {
        setProducts(res.data.reverse())
        
       
      })
      axios.get(`${api}/api/category/getCategories`).then((res)=>
      {
           setCategories(res.data.categories)
           
      })

   },[])
  
  const handleCategoryFilter=(id)=>
  {
       axios.get(`${api}/api/product/getProducts/${id}`).then((res)=>
       {
        setCatProducts([...res.data])
        
        setCategorySelect(res.data[0].productCategory.category)
        
       })
  }
  
  const addToCart=async (productId)=>
  {
    
    let user= localStorage.getItem("user")
    user= JSON.parse(user)
    let userId=user._id
    let data={
      userId,
      productId
    }
    const token = Cookies.get("token")
    const config={
      headers:{"Content-Type":"application/json","token":token},
      "withCredentials":true
      
     }
    await axios.post(`${api}/api/cart/addtocart`,data,config).then((res)=>
    {
      console.log(res.data.message)
    })

    // const requestOptions={
     
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "token":token

    //         },
    //         credentials: "include",
    //         method: "POST",
    //         body: JSON.stringify(data)
    // }

    // let response= await fetch(`${api}/api/cart/addtocart`,requestOptions)
    // response=await response.json()
    // console.log(response)
    
  }

    

 
  
  return (
    <div>

<div className='bg-dark'>
    <div className='container'>
      <div className='row '>
        <div className='col-md-12 text-center mt-3'>
        <h3 className='text-white' style={{fontFamily:"cursive"}} >New Items</h3>
        </div>  
      </div>
    </div> 
</div>
<div style={{backgroundColor:"#ebebe0"}}>
    <div className='container'> 
      <div className='row'>
        
        <div style={{marginTop:"15px"}} className="gallery-container">
  <div className="thumbnails"></div>
  {products && 
  <div className="slides">
    <div><img alt='prodImg' className='slideImg' src={`${products[0].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[1].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[2].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[3].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[4].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[5].productImage}`}></img></div>
    <div><img alt='prodImg' className='slideImg' src={`${products[6].productImage}`}></img></div>
    
  </div>
 
  }

</div>

        
      </div>
      <br></br>
      </div>
</div> 
<div className='bg-dark'>
  <div className='container'>
      <div className='row'>
        <div style={{height:"150x"}} className='col-md-6'>
           
        <form style={{marginTop:"30px"}}>
        <div class="form-group">
      <div className='container'>
      <label style={{color:"white"}}>Find item <i className="fa-solid fa-magnifying-glass text-white"></i></label>
      </div>
    <input onChange={(e)=>setQuery(e.target.value)} style={{marginTop:"5px"}} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="search for food"></input>
    
    
  </div>
        </form>
  


        </div>
        <div style={{height:"150px"}} className='col-md-6'>



        <div style={{margin:"auto",marginTop:"58px"}} className="dropdown">
  <button className="btn btn-success dropdown-toggle" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
    {categorySelect}
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
  <li><button onClick={()=>{setCatProducts(false)
  setCategorySelect("select category")}} className="dropdown-item" href="#">All items</button></li>
    {
      
      categories && categories.map((category)=>
      {
        return(
          <li><button onClick={()=>handleCategoryFilter(category._id)} className="dropdown-item" href="#">{category.category}</button></li>
        )
      })
    }
    

    
  </ul>
</div>







        </div>
             
      </div>
  </div>
</div> 
<div style={{backgroundColor:"#f5f5ef"}}>
  <div className='container'>

    <div style={{marginTop:"20px"}} className='row'>

      {/* All products */}
      {
       !catProducts && products && products.reverse().filter((product)=>
       {
        return product.productName.toLowerCase().includes(query.toLowerCase().trim())
       }).map((product)=>
        {
          return(
            <div className='col-md-3'>
                <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" style={{height:"250px", width:"17.9rem"}} src={product.productImage} alt="Card img cap"></img>
  <div className="card-body">
    <h5 className="card-title">{product.productName}</h5>
    <hr></hr>
    <h6 className="card-text">{product.productCategory.category}</h6>
    <p className="card-text">{product.productPrice} Rs</p>
    <p className="card-text">{product.productDescription}</p>
    
    <button onClick={()=>addToCart(product._id)}  className="btn btn-outline-dark">Add to cart</button>
  </div>
</div><br></br>

            </div>
          )
        })
      }

      {/* category products */}
      {
        catProducts && catProducts.filter((product)=>
        {
          return(product.productName.toLowerCase().includes(query.toLowerCase().trim()))
        }).map((product)=>
        {
          return(
            <div className='col-md-3'>
                <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" style={{height:"250px", width:"17.9rem"}} src={product.productImage} alt="Card img cap"></img>
  <div className="card-body">
    <h5 className="card-title">{product.productName}</h5>
    <hr></hr>
    <h6 className="card-text">{product.productCategory.category}</h6>
    <p className="card-text">{product.productPrice} Rs</p>
    <p className="card-text">{product.productDescription}</p>
    
    <button onClick={()=>addToCart(product._id)}  className="btn btn-outline-dark">Add to cart</button>
  </div>
</div><br></br>

            </div>
          )
        })

      }
      {/* search products */}
      {

      }
      </div>
  </div>
</div>    
    </div>
    
  )
}

export default UserDashboard
