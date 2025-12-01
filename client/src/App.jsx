import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ApplyJob from './pages/ApplyJob'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/apply-job' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<ApplyJob />} />
      </Routes>
    </div>
  )
}

export default App
