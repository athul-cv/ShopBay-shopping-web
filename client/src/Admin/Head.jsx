import React from 'react'
import './style.css'
import adminlogo from './admin.jpg'


const Head = () => {
  return (
    <div className='headerDiv' >
      

    <div className='logodiv'>
      <img src={adminlogo} alt='img' style={{width:"150px",height:"80px",borderRadius:"50%"}}/>
    </div>
    <h2>ADMIN PAGE</h2>
    </div>
  )
}

export default Head