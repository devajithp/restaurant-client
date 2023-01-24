import React from 'react'
import { useHistory } from 'react-router-dom'

function AdminActionBtns() {
  const history=useHistory()
  return (
    
      <div className='bg-light py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 mb-2 text-center'>
               <button data-bs-toggle="modal" data-bs-target="#addCategoryModal" style={{width:"270px"}} className='btn btn-outline-info btn-block ' ><i className='fas fa-plus'></i> Add Category</button>
            </div>
            <div className='col-md-4 mb-2 text-center'>
               <button data-bs-toggle="modal" data-bs-target="#addFoodModal" style={{width:"270px"}}  className='btn btn-outline-warning btn-block' ><i className='fas fa-plus'></i> Add Food</button>
            </div>
            <div className='col-md-4 mb-2 text-center'>
               <button onClick={()=>{history.push("/admin/orders")}} style={{width:"270px"}}  className='btn btn-outline-success btn-block' ><i className="fa-sharp fa-solid fa-eye"></i> View orders</button>
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default AdminActionBtns
