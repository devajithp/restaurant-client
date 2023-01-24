import React,{Fragment} from 'react'
import { useDispatch } from 'react-redux'

import { Link,useHistory,withRouter } from 'react-router-dom'
import { logout } from '../Api/Auth'
import { isAuthenticated } from '../Helpers/Auth'
import { EMPTY_PRODUCT } from '../redux/constants/productConstants'




function Header() {
  const dispatch=useDispatch()
  const history=useHistory()
  const handleLogout=()=>
  {
   logout(()=>
   { 
     history.push("/signin")
   })
  }

    const showNavigation=()=>(
        <div>
            <nav onClick={()=> dispatch({
            type:EMPTY_PRODUCT
           })} className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand text-dark" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      {
          isAuthenticated() && isAuthenticated().role===0 &&
          <li className="nav-item">
          <Link className="nav-link text-dark" to="/user/cart"><i className="fa-solid fa-cart-shopping"></i>  Cart</Link>
          </li> 
        }
        {
          isAuthenticated() && isAuthenticated().role===0 &&
          <li className="nav-item">
          <Link className="nav-link text-dark" to="/user/orders"><i class="fa-solid fa-newspaper"></i>  Orders</Link>
          </li> 
        }
        {
          isAuthenticated() && isAuthenticated().role===1 &&
          <li className="nav-item">
          <Link className="nav-link text-dark" to="/admin/orders"><i class="fa-solid fa-newspaper"></i>  Orders</Link>
          </li> 
        }
        {!isAuthenticated() && <li className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/signup"><i className='fas fa-edit'></i> SignUp</Link>
        </li>
        }
        {!isAuthenticated() && <li className="nav-item">
          <Link className="nav-link text-dark" to="/signin"><i className='fa fa-sign-in'></i> SignIn</Link>
        </li>
        }
        {
          isAuthenticated() && isAuthenticated().role===0 &&
          <li className="nav-item">
          <Link className="nav-link text-dark" to="/user/dashboard"><i className='fa fa-home'></i>  Dashboard</Link>
          </li> 
        }
        {
          isAuthenticated() && isAuthenticated().role===1 &&
          <li className="nav-item">
          <Link onClick={()=> dispatch({
            type:EMPTY_PRODUCT
           })} className="nav-link text-dark" to="/admin/dashboard"><i className='fa fa-home'></i> Dashboard</Link>
          </li> 
        }
               
        { isAuthenticated() && <li className="nav-item">
          <Link onClick={handleLogout} className="nav-link text-dark" ><i className="fa fa-sign-out" style={{color:"red"}}></i> Logout</Link>
        </li>}
        
      </ul>
      
    </div>
  </div>
</nav>
        </div>
    )
  return (
    <header>
     {showNavigation()}
    </header>
  )
}

export default withRouter(Header)
