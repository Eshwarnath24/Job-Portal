import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const Applications = () => {

  return (
    <div className="container mx-auto p-5">


      <table className="w-full max-w-4xl max-sm:text-sm bg-white border border-gray-200">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">User name</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
            <th className="py-2 px-4 text-left">Resume</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {viewApplicationsPageData.map((application, index) => (
            <tr key={application._id} className="border-b hover:bg-gray-50">

              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center flex items-center gap-2">
                <img src={application.imgSrc} alt="" className="w-10 h-10 rounded-full max-sm:hidden" />
                <p>
                  {application.name}
                </p>
              </td>

              <td className="py-2 px-4 max-sm:hidden">{application.jobTitle}</td>
              <td className="py-2 px-4 max-sm:hidden">{application.location}</td>

              <td className="py-3">
                <button className="text-blue-500 font-medium flex gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  Resume
                  <img src={assets.resume_download_icon} alt="" />
                </button>
              </td>

              <td className='py-2 px-4 border-b relative'>
                <div className='relative inline-block text-left group'>
                  <button className='text-gray-500 action-button'>...</button>
                  <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                    <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                    <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                  </div>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Applications
