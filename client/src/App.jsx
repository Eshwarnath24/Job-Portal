import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ApplyJob from './pages/ApplyJob'
import AppliedJobs from './pages/AppliedJobs'
import RecrutierLogin from './components/RecrutierLogin'
import { AppContext } from './context/AppContext'

const App = () => {

  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecrutierLogin />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
      </Routes>
    </div>
  )
}

export default App
