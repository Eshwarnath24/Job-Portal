import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {

    const { searchFilter, isSearched, setSearchFilter, jobs } = useContext(AppContext);

    return (
        <div className='flex flex-col lg:flex-row gap-6 mt-2'>
            <div className='flex flex-col justify-start items-center w-full lg:w-1/4 bg-white px-4 py-5'>
                {
                    isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-3'>
                                {
                                    searchFilter.title && <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-md mr-2'>
                                        {searchFilter.title}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                }
                                {
                                    searchFilter.location && <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded-md ml-2'>
                                        {searchFilter.location}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                }
                            </div>
                        </>
                    )
                }

                <div className='max-lg:hidden mb-10'>
                    <h4 className='font-medium text-lg py-4'>Search By Categories</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobCategories.map((category, index) => {
                            return (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input className='scale-125' type="checkbox" name="" id={`category-${index}`} />
                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className='max-lg:hidden'>
                    <h4 className='font-medium text-lg py-4'>Search By Location</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobLocations.map((category, index) => {
                            return (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input className='scale-125' type="checkbox" name="" id={`location-${index}`} />
                                    <label htmlFor={`location-${index}`}>{category}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        jobs.map((job, index) => {
                            return (<JobCard key={index} job={job} />)
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default JobListing
