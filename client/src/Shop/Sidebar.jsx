import React from 'react'
import { Link } from 'react-router-dom'
import './ShopStyle.css'

const Sidebar = () => {
  return (
    <div>
      



      <Link to={'/Shop'} className='shoplinks'><div className='shopSideBarLinks'> Home</div></Link>

      <Link to={'/Shop/AddProduct'} className='shoplinks'><div className='shopSideBarLinks'> AddProduct</div></Link>


      
      <Link to={'/Shop/Myprofile'} className='shoplinks'> <div className='shopSideBarLinks'> Myprofile</div></Link>
      <Link to={'/Shop/Editprofile'} className='shoplinks'> <div className='shopSideBarLinks'> EditProfile</div></Link>
      <Link to={'/Shop/Changepassword'} className='shoplinks'> <div className='shopSideBarLinks'> Changepassword</div></Link>
      <Link to={'/Shop/OrderStatus'} className='shoplinks'> <div className='shopSideBarLinks'> OrderStatus</div></Link>







    </div>
  )
}

export default Sidebar