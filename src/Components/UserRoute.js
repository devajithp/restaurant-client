import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../Helpers/Auth'

function UserRoute({component:Component,...rest}) {
  return (
    <Route {...rest}
      render={(props)=>
      isAuthenticated() && isAuthenticated().role===0 ?(<Component {...props}/>):(<Redirect to="/signin"/>)
      }/>
  )
}

export default UserRoute
