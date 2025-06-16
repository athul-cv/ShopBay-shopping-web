import React from 'react'
import Head from './Head'
import { Route, Routes } from 'react-router-dom'
import './Usersstyle.css'
import Home from './Home'
import PersonalInfo from './PersonalInfo'
import Editprofile from './Editprofile'
import Changepassword from './Changepassword'
import Relatedproducts from './Relatedproducts'
import ProductDetails from './ProductDetails'
import PageCart from './PageCart'
import WishList from './WishList'
import Orders from './Orders'
import Coupons from './Coupons'
import HoverPage from './HoverPage'
import CheckoutPage from './CheckoutPage'
import DeliveryDetails from './DeliveryDetails'
import WriteReview from './WriteReview'
import BuyNowCheckout from './BuyNowCheckout'
import Mobiles from './Mobiles'


const App = () => {
  return (
    <div className='User-main'>
      <div className='Userhead'>
      <Head />
      </div>
    <div className='UserHome'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='PersonalInfo' element={<PersonalInfo/>}/>
        <Route path='Editprofile' element={<Editprofile/>}/>
        <Route path='Changepassword' element={<Changepassword/>}/>
        <Route path='Relatedproducts/:id' element={<Relatedproducts/>}/>
        <Route path='ProductDetails/:id' element={<ProductDetails/>}/>
        <Route path='PageCart' element={<PageCart/>}/>
        <Route path='WishList' element={<WishList/>}/>
        <Route path='Orders' element={<Orders/>}/>
        <Route path='Coupons' element={<Coupons/>}/>
        <Route path='HoverPage' element={<HoverPage/>}/>
        <Route path='CheckoutPage' element={<CheckoutPage/>}/>
        <Route path='Deliverydetails/:id' element={<DeliveryDetails/>}/>
        <Route path='WriteReview/:id' element={<WriteReview/>}/>
        <Route path='BuyNowCheckout/:id' element={<BuyNowCheckout/>}/>
        <Route path='Mobiles/:id' element={<Mobiles/>}/>
       
       
    </Routes>
    </div>
    </div>
  )
}

export default App