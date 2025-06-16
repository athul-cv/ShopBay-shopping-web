import React, { useState } from 'react'
import './Gueststyle.css'
import { Link } from 'react-router-dom'
import logo from './GuestImages/images.png'



const Head = () => {
  const [menuOpen,setMenuOpen]=useState(false)
  return (
    <div className='headfulldiv'>
      <div className='headcontainer'>
        <div className='sidelogodiv'><img src={logo} alt='img' style={{ width: "160px", height: "100px", objectFit: "contain" }} /></div>

        <div className='menu' onClick={()=>setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 24 24">
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
          </svg>
        </div>

        {/* <div className='linksUS'> */}
        <ul className={menuOpen ? "open" : ""}>
          <li>  <Link to={'/User'} className='links'>Home</Link></li>
          <li> <Link to={'/Guest/Login'} className='links'>Login</Link></li>
          <li> <Link to={'/Guest/User'} className='links'>User</Link></li>
          <li> <Link to={'/Guest/Shop'} className='links'>Shop</Link></li>
          <li> <Link to={'/Guest/Shop'} className='links'>Contact Us</Link></li>
        </ul>
        {/* </div> */}
      </div>



    </div>
  )
}

export default Head