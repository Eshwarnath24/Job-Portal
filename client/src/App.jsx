import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ApplyJob from './pages/ApplyJob'
import AppliedJobs from './pages/AppliedJobs'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
      </Routes>
    </div>
  )
}

export default App
