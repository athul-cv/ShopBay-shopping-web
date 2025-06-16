import React from 'react'
import './ShopStyle.css'
import shopHomeimg from './shopImages/sellonlineShop.jpg'

const Home = () => {
  return (
    <div className='homeDivShopPage'>
      <div style={{ width: "40%", marginLeft: "120px", marginTop:"", }}>
          <div className='ONLINEDiv' >SELL</div>
          <div className='ONLINEDiv'>ONLINE WITH</div>
          <div className='ONLINEDiv'>SHOP BAY.</div>
          </div>

          <div>
            <img src={shopHomeimg} alt="img" style={{marginTop:""}}/>
          </div>
    </div>
  )
}

export default Home