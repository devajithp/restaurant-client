import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
function Orders() {
  const api="https://brick-red-angler-cape.cyclic.app"
const[orders,setOrders]=useState(false)
const[search,setSearch]=useState("")
    useEffect(()=>
    {
        let user=JSON.parse(localStorage.getItem("user"))
        let userId=user._id
        axios.get(`${api}/api/order/getorders/${userId}`).then((res)=>
        {
          
            setOrders([...res.data])
        })
    },[])

    const handleSearch=(e)=>
    {
        setSearch(e.target.value)
    }


  return (
    <div>
        <div className='bg-dark' style={{height:"80px"}}>
          <div style={{paddingTop:"20px"}} className='container d-flex'>
         <i style={{color:"white", marginTop:"10px",marginRight:"8px"}} className="fa fa-search" ></i><input onChange={handleSearch} style={{width:"350px"}}  type="text" className="form-control" id="exampleFormControlInput1" placeholder="search by date (yyyy-mm-dd)"></input>
          </div>
        </div>
        <br></br>
    <div className='container'>


      {orders && <div className='row'>
        <div className='col-md-12'>

      { orders.reverse().filter((order)=>
      {
        return(
            order.createdAt.includes(search)
        )
      }).map((order)=>
      { return(
        <div>    
        <div className="card">
  <div className="card-body">
    
        <h5><span className='text-secondary'>OrderId</span>: {order._id}</h5> 
        <h5 style={{marginLeft:"20px"}}><span className='text-primary'>Date</span>: {order.createdAt.slice(0,10)}</h5>
        
        
    
    <h5 style={{marginLeft:"20px"}}><span className='text-primary'>Total</span>: {order.price}</h5>
    <hr></hr>
    <div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Food</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    { order.products.map((product)=>
    {
           return(
            <tr>
      <td><img alt='prodImg' style={{width:"50px", height:"50px"}} src={`${product.productId.productImage}`}></img></td>
      <td>{product.productId.productName}</td>
      <td>{product.quantity}</td>
      <td>{product.productId.productPrice}</td>
    </tr>
           )
    })
    
      }
  </tbody>
</table>
    </div>
    <hr></hr>
    <div className='d-flex'>
        <h6><span className='text-primary'>Payment</span>: {order.payment}</h6>
        <h6 style={{marginLeft:"20px"}}><span className='text-primary'>status</span>: {order.status}</h6>
       {/* {<button className='btn btn-outline-success btn-sm' style={{marginLeft:"20px"}}>Confirm</button>}
       {<button className='btn btn-outline-danger btn-sm' style={{marginLeft:"20px"}}>Cancel</button>} */}
        
    </div>
    <div>
    <div className="dropdown show">
  <button className="btn btn-secondary btn-sm dropdown-toggle"   id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Address
  </button>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <p className="dropdown-item" >{order.address.name}</p>
    <p className="dropdown-item" >{order.address.state}, {order.address.district}, {order.address.landmark}, {order.address.houseName}</p>
    <p className="dropdown-item" >Pin: {order.address.pincode}</p>
    <p className="dropdown-item" >{order.address.mobileNumber}</p>
    
  </div>
</div>
    </div>
  </div>
</div>
<br></br>
      </div>)
      }) }
        </div>
      </div>}
      </div>
    </div>
  )
}

export default Orders
