import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios'
import {  useHistory } from "react-router-dom"
import { thingsProvider } from './App'
import Cookies from 'js-cookie'

const UserCart = () => {
    const[status,setStatus]=useState(true)
    const[cart,setCart]= useState()
    const [grantTotal,setGrantTotal]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const history=useHistory()
    const {totalPrice,setTotalPrice}= useContext(thingsProvider)
    const [incLoading,setIncLoading]=useState(false)
    const [decLoading,setDecLoading]=useState(false)
    const api="https://brick-red-angler-cape.cyclic.app"
    useEffect(()=>
    {
        let user=JSON.parse(localStorage.getItem("user"))
        let userId=user._id
        axios.get(`${api}/api/cart/getcart/${userId}`).then((res)=>
        {
            
            if(res.data.length===0||res.data.length===undefined)
            {
               setStatus(false)
            }
            else
            {
                
               setCart([...res.data])
               let total=0
               res.data.forEach(data => {
                
                total=total +data.total

               });
               setTotalPrice(total)
               setGrantTotal(total)
            }
        })
    },[grantTotal,refresh])
    const IncrementProduct=(productId)=>
    {
      let user=JSON.parse(localStorage.getItem("user"))
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
       setIncLoading(true)
      axios.patch(`${api}/api/cart/incquantity`,data,config).then((res)=>
      {
        
        setRefresh(!refresh)
        setIncLoading(false)
      })
    }
    const DecrementProduct=(productId)=>
    {
      let user=JSON.parse(localStorage.getItem("user"))
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
       setDecLoading(true)
      axios.patch(`${api}/api/cart/decquantity`,data,config).then((res)=>
      {
        
        setRefresh(!refresh)
        setDecLoading(false)
      })
      
    }
    const RemoveProduct=(productId)=>
    {
      let user=JSON.parse(localStorage.getItem("user"))
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
      axios.patch(`${api}/api/cart/removeProduct`,data,config).then((res)=>
      {
        
        setRefresh(!refresh)
      })
    }
  return (
    <div className='container'>
      

      {!status &&<div className='container'>
        <div className='row'> 
          <div className='col-md-12'>
            <br></br>
          <h5>Cart is Empty , please add items...</h5>
       <img alt='emptyimg' style={{display:"block",width:"50%",marginLeft:"auto",marginRight:"auto"}} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png'></img>
       </div>
       </div>
       </div> }



      {status && <div style={{textAlign:"center"}} className='container'>
      <h2 style={{margin:"auto"}}>Cart</h2>
         <div style={{marginTop:"10px"}} className='row'>
            <div style={{overflowX:"auto"}} className='col-md-12'>
            <table style={{width:"100%"}} className="table">
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Food</th>
      <th scope="col"></th>
      <th scope="col">Qty</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">price</th>
      
    </tr>
  </thead>
  <tbody>

    {cart  && cart.map((eachProduct)=>
    {
        return(
            <tr>
      <td><img alt="prodImg" style={{height:"75px",width:"75px"}} src={`${eachProduct.products.productId.productImage}`}></img></td>
      <td>{eachProduct.products.productId.productName}</td>
      <td style={{width:"3%"}}><button onClick={()=>DecrementProduct(eachProduct.products.productId._id)} disabled={eachProduct.products.quantity===1 || decLoading} className='btn btn-secondary btn-sm'><i className="fa-solid fa-arrow-down"></i></button></td>
      <td style={{width:"3%"}}>{eachProduct.products.quantity} </td> 
      <td style={{width:"3%"}}><button onClick={()=>IncrementProduct(eachProduct.products.productId._id)} disabled={incLoading} className='btn btn-secondary btn-sm'><i className="fa-solid fa-arrow-up"></i></button></td>
      <td ><button onClick={()=>RemoveProduct(eachProduct.products.productId._id)} className='btn btn-danger btn-sm'><i class="fa-solid fa-trash"></i></button></td>
      <td>{eachProduct.total}</td>
    </tr> 
        )
    })}
    
    
  </tbody>
</table>
            </div>
         </div>
         <h3>Total Price : <span>{totalPrice}</span></h3>
         <button onClick={()=>{history.push({pathname:"/user/ordersummary",state:{total:grantTotal}})}} style={{marginTop:"10px"}} className='btn btn-success'>Order Summary</button>
      </div>}
      
    </div>
  )
}

export default UserCart


