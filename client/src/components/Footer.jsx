import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 sxl:px-20 mx-auto flex items-center justify-between gap-3 py-3 mt-20'>
      <img width={160} src={assets.logo} alt="" />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>All right reserved. Copyright @job-portal  </p>
      <div className='flex items-center gap-3'>
        <img width={38} src={assets.instagram_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.facebook_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer