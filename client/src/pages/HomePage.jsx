import React from 'react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'

function HomePage() {
  return (
    <div>
        <Navbar />
        <Hero />
        <JobListing />
    </div>
  )
}

export default HomePage
