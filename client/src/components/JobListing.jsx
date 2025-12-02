import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {

    const { searchFilter, isSearched, setSearchFilter, jobs } = useContext(AppContext);

    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState(jobs);


    const handleCategories = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    }

    const handleLocations = (location) => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]);
    }

    useEffect(() => {

        const matchesCategory = (job) => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = (job) => selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle = (job) => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = (job) => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilteredJobs(newFilteredJobs)

    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='flex flex-col lg:flex-row gap-6 mt-2'>
            <div className='flex flex-col justify-start w-full lg:w-2/12 bg-white px-4 py-5 mx-10'>
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

                <button onClick={() => setShowFilter(prev => !prev)} className='border border-gray-300 px-10 py-1 rounded lg:hidden w-auto self-start'>
                    {showFilter ? "Close" : "Filters"}
                </button>

                <div className={showFilter ? "mb-10" : "max-lg:hidden mb-10"}>
                    <h4 className='font-medium text-lg py-4'>Search By Categories</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobCategories.map((category, index) => {
                            return (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input onClick={() => handleCategories(category)} checked={selectedCategories.includes(category)} className='scale-125' type="checkbox" name="" id={`category-${index}`} />
                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search By Location</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobLocations.map((location, index) => {
                            return (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input onClick={() => handleLocations(location)} checked={selectedLocations.includes(location)} className='scale-125' type="checkbox" name="" id={`location-${index}`} />
                                    <label htmlFor={`location-${index}`}>{location}</label>
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
                        filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => {
                            return (<JobCard key={index} job={job} />)
                        })
                    }
                </div>

                {filteredJobs.length > 6 && (
                    <div className='flex justify-center items-center space-x-3 my-7'>
                        <a onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} href="#job-list">
                            <img src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`flex items-center justify-center rounded border border-gray-300 w-10 h-10 ${currentPage === index + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} href="#job-list">
                            <img src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing