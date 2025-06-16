import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import District from './District'
import Place from './Place'
import category from './category'
import SubCategory from './SubCategory'
import adminlogo from './admin.jpg'

const SideBar = () => {
  return (
    <div >
      <div className='adminlogo'>
        <img src={adminlogo} alt='img' className='adminimage'></img>
        <h2 className='admintext'>ADMIN</h2>
      </div>

      <hr />
      <div style={{margin:"5px", marginTop: "100px"}}>
        <Link to={'/Admin/District'} className='Llinks'>
          <div className='AdminInfoPages'>
            <ul style={{ listStyleType: "circle", color: "black",paddingTop:"10px" }}>
              <li>District</li>
            </ul></div></Link>

        <Link to={'/Admin/Place'} className='Llinks'>
          <div className='AdminInfoPages'>
            <ul style={{ listStyleType: "circle", color: "black",paddingTop:"10px" }}>
              <li>Place</li>
            </ul>
          </div></Link>

          <Link to={'/Admin/category'} className='Llinks'>
          <div className='AdminInfoPages'>
            <ul style={{ listStyleType: "circle", color: "black",paddingTop:"10px" }}>
              <li>Category</li>
            </ul>
          </div> </Link>

        <Link to={'/Admin/SubCategory'} className='Llinks'>
          <div className='AdminInfoPages'>
            <ul style={{ listStyleType: "circle", color: "black",paddingTop:"10px" }}>
              <li>Subcategory</li>
            </ul>
          </div> </Link>

       
      </div>
    </div>

  )
}

export default SideBar