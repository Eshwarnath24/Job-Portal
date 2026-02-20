import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ApplyJob from './pages/ApplyJob'
import AppliedJobs from './pages/AppliedJobs'
import RecrutierLogin from './components/RecrutierLogin'

import { AppContext } from './context/AppContext'

import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import Applications from './pages/Applications'

import "quill/dist/quill.snow.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecrutierLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {
            companyToken ?
              <>
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<Applications />} />
              </>
              : null
          }


        </Route>
      </Routes>
    </div>
  )
}

export default App
