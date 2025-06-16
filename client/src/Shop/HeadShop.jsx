import React from 'react'
import siteLogo from './shopImages/images.png'
const HeadShop = () => {
  return (
    <div style={{display:'flex',justifycontent:"center",alignitems:"center"}}>
      <img src={siteLogo} alt="img" className='sitelogo' />

      <h2 className='shoptxtHead'>SHOP DETAILS</h2>

    </div>
  )
}

export default HeadShop