import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment'

const AppliedJobs = () => {

  const [isEdit, setIsEdit] = useState(false);
  const [_, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit
              ? <>
                <label className='flex items-center' htmlFor="resumeUpload">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} className='hidden' type='file' />
                  <img src={assets.profile_upload_icon} alt="Upload resume" />

                </label>
                <button onClick={() => setIsEdit(false)} className='border border-green-400 bg-green-100 rounded-lg px-4 py-2'>Save</button>
              </>
              : <div className='flex gap-2'>
                <span className=' bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</span>
                <button onClick={() => setIsEdit(prev => !prev)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
              </div>
          }
        </div>

        <h2 className='text-x1 font-semibold mb-4'>Jobs Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => job ? (
              <tr key={job.id ?? index}>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-8' src={job.logo} alt={`${job.company} logo`} />
                  {job.company}
                </td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b'>{job.location}</td>
                <td className='py-2 px-4 border-b'>{moment(job.date).format('LL')}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default AppliedJobs
