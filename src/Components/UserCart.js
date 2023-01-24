import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from "react-router-dom"
import { thingsProvider } from './App'

const UserCart = () => {
    const[status,setStatus]=useState(true)
    const[cart,setCart]= useState()
    const [grantTotal,setGrantTotal]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const history=useHistory()
    const {totalPrice,setTotalPrice}= useContext(thingsProvider)
    
    useEffect(()=>
    {
        let user=JSON.parse(localStorage.getItem("user"))
        let userId=user._id
        axios.get(`http://localhost:5000/api/cart/getcart/${userId}`).then((res)=>
        {
            
            if(res.data.length===0||res.data.length===undefined)
            {
               setStatus(false)
            }
            else
            {
                console.log(res.data)
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
      const config={
        headers:{"Content-Type":"application/json"},
        "withCredentials":true
       }
      axios.patch("http://localhost:5000/api/cart/incquantity",data,config).then((res)=>
      {
        console.log(res.data)
        setRefresh(!refresh)
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
      const config={
        headers:{"Content-Type":"application/json"},
        "withCredentials":true
       }
      axios.patch("http://localhost:5000/api/cart/decquantity",data,config).then((res)=>
      {
        console.log(res.data)
        setRefresh(!refresh)
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
      const config={
        headers:{"Content-Type":"application/json"},
        "withCredentials":true
       }
      axios.patch("http://localhost:5000/api/cart/removeProduct",data,config).then((res)=>
      {
        console.log(res.data)
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
       <img style={{display:"block",width:"50%",marginLeft:"auto",marginRight:"auto"}} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png'></img>
       </div>
       </div>
       </div> }



      {status && <div style={{textAlign:"center"}} className='container'>
      <h2 style={{margin:"auto"}}>Cart</h2>
         <div style={{marginTop:"10px"}} className='row'>
            <div className='col-md-12'>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Food</th>
      <th scope="col">quantity</th>
      <th scope="col"></th>
      <th scope="col">price</th>
      
    </tr>
  </thead>
  <tbody>

    {cart  && cart.map((eachProduct)=>
    {
        return(
            <tr>
      <td><img style={{height:"75px",width:"75px"}} src={`${eachProduct.products.productId.productImage}`}></img></td>
      <td>{eachProduct.products.productId.productName}</td>
      <td><button onClick={()=>DecrementProduct(eachProduct.products.productId._id)} disabled={eachProduct.products.quantity===1} className='btn btn-secondary btn-sm'><i className="fa-solid fa-arrow-down"></i></button> {eachProduct.products.quantity} <button onClick={()=>IncrementProduct(eachProduct.products.productId._id)} className='btn btn-secondary btn-sm'><i class="fa-solid fa-arrow-up"></i></button></td>
      <td><button onClick={()=>RemoveProduct(eachProduct.products.productId._id)} className='btn btn-danger btn-sm'><i class="fa-solid fa-trash"></i></button></td>
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


