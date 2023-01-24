import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AllOrders() {

    const[orders,setOrders]=useState(false)
    const[refresh,setRefresh]=useState(false)
    const[search,setSearch]=useState("")
 
        useEffect(()=>
        {
            
            axios.get("http://localhost:5000/api/order/getorders").then((res)=>
            {
                console.log(res.data)
                setOrders([...res.data])
            })
        },[refresh])
    
        const handleSearch=(e)=>
        {
            setSearch(e.target.value)
        }
        const confirmOrder=(orderId)=>
        {
          let config={
            headers:{"Content-Type":"application/json"},
            "withCredentials":true
          }
          let data={

          }
          axios.patch(`http://localhost:5000/api/order/confirm/${orderId}`,data,config).then((res)=>
          {
            console.log(res.data)
            setRefresh(!refresh)
           
          })
        }
        const cancelOrder=(orderId)=>
        {
          let config={
            headers:{"Content-Type":"application/json"},
            "withCredentials":true
          }
          let data={

          }
          axios.patch(`http://localhost:5000/api/order/cancel/${orderId}`,data,config).then((res)=>
          {
            console.log(res.data)
            setRefresh(!refresh)
            
          })

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
<div className='d-flex'>
    <h5><span className='text-primary'>OrderId</span>: {order._id}</h5> 
    <h5 style={{marginLeft:"20px"}}><span className='text-primary'>Date</span>: {order.createdAt.slice(0,10)}</h5>
    
    
</div>
<h5 style={{marginLeft:"20px"}}><span className='text-danger'>Total</span>: {order.price}</h5>
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
  <td><img style={{width:"50px", height:"50px"}} src={`${product.productId.productImage}`}></img></td>
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
   {<button  onClick={()=>confirmOrder(order._id)} className='btn btn-outline-success btn-sm' style={{marginLeft:"20px"}}>Confirm</button>}
   {<button  onClick={()=>cancelOrder(order._id)} className='btn btn-outline-danger btn-sm' style={{marginLeft:"20px"}}>Cancel</button>}
    
</div>
<div>
<div className="dropdown show">
<a className="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Address
</a>

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

export default AllOrders
