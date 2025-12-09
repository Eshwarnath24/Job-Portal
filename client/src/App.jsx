import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ApplyJob from './pages/ApplyJob'
import AppliedJobs from './pages/AppliedJobs'
import RecrutierLogin from './components/RecrutierLogin'

import { AppContext } from './context/AppContext'

import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import Applications from './pages/Applications'

const App = () => {

  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecrutierLogin />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-jobs' element={<ManageJobs />} />
          <Route path='view-applications' element={<Applications />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
