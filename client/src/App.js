import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GApp from './Guest/App'
import AApp from './Admin/App'
import SApp from './Shop/App'
import UApp from './User/App'



const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<GApp />} />
      <Route path="/Admin/*" element={<AApp />} />
      <Route path="/Shop/*" element={<SApp />} />
      <Route path="/User/*" element={<UApp />} />
    </Routes>
  )
}

export default App