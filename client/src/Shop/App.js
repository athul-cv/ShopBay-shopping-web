import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './ShopStyle.css'
import AddProduct from './AddProduct'
import Sidebar from './Sidebar'
import Home from './Home'
import AddStock from './AddStock'
import Myprofile from './Myprofile'
import Editprofile from './Editprofile'
import Changepassword from './Changepassword'
import HeadShop from './HeadShop'
import Gallery from './Gallery'
import OrderStatus from './OrderStatus'
const App = () => {
  return (
    <div className='Shop-main'>
      <div className='shop-head'>
        <HeadShop />
      </div>
      <div className='shop-sidebar'>
        <Sidebar />
      </div >
      <div className='ShopHome'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='AddProduct' element={<AddProduct />} />
          <Route path='AddStock' element={<AddStock />} />
          <Route path='Myprofile' element={<Myprofile />} />
          <Route path='Editprofile' element={<Editprofile />} />
          <Route path='Changepassword' element={<Changepassword />} />
          <Route path='Gallery/:id' element={<Gallery />} />
          <Route path='OrderStatus' element={<OrderStatus />} />
        </Routes>
      </div>
    </div>
  )
}

export default App