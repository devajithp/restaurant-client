import React, { useContext, useEffect,useState } from 'react'
import { thingsProvider } from './App'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function OrderSummary() {
 const{totalPrice,setTotalPrice}=useContext(thingsProvider) 
 const[errorMessage,setErrorMessage]=useState(false)
 const[Address,setAddress]=useState({name:"",mobileNumber:"",state:"",district:"",pincode:"",houseName:"",landmark:"",payment:""})

 const history= useHistory()
 const handleChange=(e)=>
 {  setErrorMessage(false)
     setAddress({
        ...Address,
        [e.target.name]:e.target.value
     })
     console.log(Address)
 }
 const handleSubmit=async()=>
 {
   
    
    if(Address.name.trim()===""||Address.mobileNumber.trim()===""||Address.state.trim()===""||Address.district.trim()===""||Address.pincode.trim()===""||Address.houseName.trim()===""||Address.landmark.trim()===""||Address.payment.trim()==="")
    {
       
        setErrorMessage("fill all the fields")
    }
    else{
        let user=JSON.parse(localStorage.getItem("user"));
        let userId=user._id;
        let cart= await axios.get(`http://localhost:5000/api/cart/getexactcart/${userId}`)
        cart=cart.data[0]
        
        let newOrder={
            userId:cart.userId,
            products:cart.products,
            address:Address,
            status:"pending",
            price:totalPrice,
            payment:Address.payment
        }
       
        if(Address.payment==="COD")
        {
             let config={
                 headers:{"Content-Type":"application/json"},
                 "withCredentials":true
             }
             let data={...newOrder}
             axios.post("http://localhost:5000/api/order/addtoorder",data,config).then((res)=>
             {
                 setTotalPrice(false)
                 console.log(res.data)
                 axios.patch(`http://localhost:5000/api/cart/removeCart/${userId}`).then((res)=>
                 {
                  history.push("/user/orders")
                   console.log(res)
                 })
             })
        }
        else
        {
            console.log("online payment")
            let config={
              headers:{"Content-Type":"application/json"},
              "withCredentials":true
          }
          

            try {
              axios.post("http://localhost:5000/api/order/razorpay/initiate",{amount:parseInt(totalPrice)},config).then((res)=>
              {
                console.log(res.data.data.amount)
                
                const options = {
                  key: "rzp_test_PgI8GB7quOoWvr",
                  amount: res.data.data.amount,
                  currency: "INR",
                  
                  description: "Test Transaction",
                  
                  order_id: res.data.data.id,
                  handler: async (response) => {
                    try {
                      
                      
                      const { data } = await axios.post("http://localhost:5000/api/order/razorpay/verify", response);
                      console.log(data);

                      let newdata={...newOrder}
                      axios.post("http://localhost:5000/api/order/addtoorder",newdata,config).then((res)=>
                      {
                          setTotalPrice(false)
                          console.log(res.data)
                          axios.patch(`http://localhost:5000/api/cart/removeCart/${userId}`).then((res)=>
                          {
                           history.push("/user/orders")
                            console.log(res)
                          })
                      })




                    } catch (error) {
                      console.log(error);
                    }
                  },
                  theme: {
                    color: "#3399cc",
                  },
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
              })
            } catch (error) {
              
            }
        }
    }
   
   
 }

  return (
    <div style={{alignItems:"center"}} className='container'>
        {errorMessage && <div style={{width:"200px",marginTop:"10px"}} className="alert alert-danger" role="alert">
        {errorMessage}</div>}

        { totalPrice && <div>
        <div style={{textAlign:"center"}}>
      <h1>Order Summary</h1><hr></hr>

      <h3>Total Price: <span className='text-danger'>{totalPrice}</span></h3>
      </div>
      <div className='row'>
      
        <div className='col-md-7'>
          <h4>Enter Address</h4>
          <div className="form-group">
   
    <input  onChange={handleChange} name='name' type="text" className="form-control" id="exampleInputEmail1"  placeholder="Enter name"></input>
    
  </div>
  <br></br>
  <div className="form-group">
    
    <input onChange={handleChange} name='mobileNumber' type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter number"></input>
  </div>
  <br></br>
  <div className="form-group">
    <input onChange={handleChange} name='state' type="text" className="form-control" placeholder="State" id="exampleCheck1"></input>
    
  </div>
  <br></br>
  <div className="form-group">
    <input onChange={handleChange} name='district' type="text" className="form-control" placeholder="District" id="exampleCheck1"></input>
    
  </div>
  <br></br>
  <div className="form-group">
    <input onChange={handleChange} name='pincode' type="text" className="form-control" placeholder="Pincode" id="exampleCheck1"></input>
    
  </div>
  <br></br>
  <div className="form-group">
    <input onChange={handleChange} name='houseName' type="text" className="form-control" placeholder="House name" id="exampleCheck1"></input>
    
  </div>
  <br></br>
  <div className="form-group">
    <input onChange={handleChange} name='landmark' type="text" className="form-control" placeholder="landmark" id="exampleCheck1"></input>
    
  </div>
  <br></br>
  <button onClick={handleSubmit} type="button" className="btn btn-primary">Place order</button>
          
        </div>
        <div style={{marginTop:"20px"}} className='col-md-5'>
        <div  className="card">
  <div  className="card-body">
    <h4>Select Payment method</h4><hr></hr>
  <input onChange={handleChange} style={{marginTop:"20px"}} name='payment' value="COD" type="radio"></input>
    <label>Cash on delivery</label><br></br>
    <input onChange={handleChange} name='payment' value="razorpay" type="radio"></input>
    <label>Razorpay</label>
    
  </div>
</div>  
        </div>
        
      </div>

      </div> }      
    </div>
  )
}

export default OrderSummary
