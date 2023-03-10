import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../Helpers/Auth'

function AdminRoute({component:Component,...rest}) {
  return (
    
      <Route {...rest}
      render={(props)=>
      isAuthenticated() && isAuthenticated().role===1 ?(<Component {...props}/>):(<Redirect to="/signin"/>)
      }/>
    
  )
}

export default AdminRoute
