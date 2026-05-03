import React from 'react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Job Portal',
  url: '/'
}

function HomePage() {
  return (
    <div>
        <Seo
          title='Job Portal | Find Jobs by Title, Location, and Category'
          description='Discover verified job openings, filter by category and location, and apply quickly from one platform.'
          canonicalPath='/'
          jsonLd={websiteSchema}
        />
        <Navbar />
        <Hero />
        <JobListing />
        <AppDownload />
        <Footer />
    </div>
  )
}

export default HomePage
