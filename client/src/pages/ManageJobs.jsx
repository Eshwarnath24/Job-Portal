import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {

  const navigate = useNavigate();

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">

        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Applicants</th>
              <th className="py-2 px-4 text-left">Visible</th>
            </tr>
          </thead>

          <tbody>
            {manageJobsData.map((job) => (
              <tr key={job._id} className="border-b text-gray-700 hover:bg-gray-50">
                
                <td className="py-2 px-4 text-left">{job._id}</td>
                <td className="py-2 px-4 text-left">{job.title}</td>
                <td className="py-2 px-4 text-left max-sm:hidden">{moment(job.date).format('ll')}</td>
                <td className="py-2 px-4 text-left max-sm:hidden">{job.location}</td>
                <td className="py-2 px-4 text-left">{job.applicants}</td>

                <td className="py-2 px-4 text-left">
                  <input
                    type="checkbox"
                    checked={job.visible}
                    readOnly
                    className="scale-125 ml-4"
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={() => navigate('/dashboard/add-job')} className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90">
          Add new job
        </button>
      </div>
    </div>
  )
}

export default ManageJobs
