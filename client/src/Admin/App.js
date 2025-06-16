import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import District from './District'
import Place from './Place'
import Category from './category'
import SubCategory from './SubCategory'
import Head from './Head'
import SideBar from './SideBar'
import './style.css'


const App = () => {
  return (
    <div className='admin-main'>
      <div className='head'>
      <Head />
      </div>
      <div className='sidebar'>
      <SideBar />
      </div >
      <div className='adminHome'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/District' element={<District />} />
        <Route path='/Place' element={< Place/>} />
        <Route path='/Category' element={< Category/>} />
        <Route path='/SubCategory' element={< SubCategory/>} />
       

      </Routes>
      </div>
    </div>
  )
}

export default App