import React from 'react'
import { assets } from '../assets/assets'

const JobCard = ({ key, job }) => {
  return (
    <div key={key} className='border border-grey-200 shadow-md p-6 rounded-md'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-2 mt-2 text-xs py-2'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-md mr-2'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded-md mr-2'>{job.level}</span>
      </div>
      <p dangerouslySetInnerHTML={{__html: job.description.slice(0, 150)}}></p>
      <div className='text-sm flex gap-4 mt-2'>
        <button className='bg-blue-500 text-white px-5 py-1.5 rounded-md'>Apply Now</button>
        <button className='border border-gray-500 text-gray-500 px-5 py-1.5 rounded-md'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard
