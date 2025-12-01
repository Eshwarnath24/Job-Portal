import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const {setIsSearched, setSearchFilter} = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });

        setIsSearched(true);

        console.log({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
    }

    return (
        <div className='flex flex-col items-center'>
            <div class="flex items-center justify-center p-4 my-10 mx-20">
                <div class="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-[2rem] p-12 w-full max-w-5xl text-center flex flex-col items-center">
                    <h1 class="text-white text-4xl sm:text-5xl font-bold mb-6">Over 10,000+ jobs to apply</h1>
                    <p class="text-purple-200 text-lg sm:text-xl max-w-3xl mb-10">Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities And Take The First Step Toward Your Future!</p>

                    <div class="bg-white p-2 rounded-md flex items-center w-full max-w-4xl shadow-lg">
                        <div class="flex items-center flex-1 px-4">
                            <img src={assets.search_icon} alt="" className='w-5 h-5 opacity-60 mr-3' />
                            <input ref={titleRef} type="text" placeholder="Search for jobs" class="w-full outline-none text-gray-700 placeholder-gray-400" />
                        </div>

                        <div class="h-8 w-px bg-gray-300 mx-2"></div>

                        <div class="flex items-center flex-1 px-4">
                            <img src={assets.location_icon} alt="" className='w-5 h-5 opacity-60 mr-3' />
                            <input ref={locationRef} type="text" placeholder="Location" class="w-full outline-none text-gray-700 placeholder-gray-400" />
                        </div>

                        <button onClick={onSearch} class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-3 transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className='boder border-grey-300 shadow-xl p-4 px-6 mt-2 mb-6 rounded-md'>
                <div className='flex justify-center flex-wrap lg:gap-16 gap-12'>
                    <p className='font-medium'>Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="" />
                    <img className='h-6' src={assets.walmart_logo} alt="" />
                    <img className='h-6' src={assets.accenture_logo} alt="" />
                    <img className='h-6' src={assets.samsung_logo} alt="" />
                    <img className='h-6' src={assets.amazon_logo} alt="" />
                    <img className='h-6' src={assets.adobe_logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero
