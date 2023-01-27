
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import AdminEditProduct from './AdminEditProduct';
import NotFound from './NotFound';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import UserCart from './UserCart';
import OrderSummary from './OrderSummary';
import Orders from './Orders';
import AllOrders from './AllOrders';
import { isAuthenticated } from '../Helpers/Auth';
import React,{ createContext, useEffect, useState } from 'react';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
const thingsProvider= createContext()

function App() {
  const[totalPrice,setTotalPrice]=useState(false)
  let dispatch= useDispatch()
  useEffect(()=>
  {
    dispatch( getCategories())
   
  },[dispatch])
  
  return (
    <thingsProvider.Provider value={{totalPrice,setTotalPrice}}>
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <main>
        <Switch>
      <Route exact path="/"><Home></Home></Route>
      <Route exact path="/restaurant-client"><Home></Home></Route>
      <Route exact path="/signup"><Signup></Signup></Route>
      <Route exact path="/signin"><Signin></Signin></Route>
      <UserRoute exact path="/user/dashboard" component={UserDashboard}></UserRoute>
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}></AdminRoute>
      <AdminRoute exact path="/admin/edit/product/:id" component={AdminEditProduct}></AdminRoute>
      <UserRoute exact path="/user/cart"><UserCart></UserCart></UserRoute>
      <UserRoute exact path="/user/ordersummary"><OrderSummary></OrderSummary></UserRoute>
      <UserRoute exact path="/user/orders"><Orders></Orders></UserRoute>
      <AdminRoute exact path="/admin/orders"><AllOrders></AllOrders></AdminRoute>
      <Route component={NotFound}></Route>
      </Switch>
      </main>
    </div>
    </BrowserRouter>
    </thingsProvider.Provider>
  );
}

export default App;
export{
  thingsProvider
}