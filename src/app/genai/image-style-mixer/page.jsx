'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import ImageStyleMixer from '../../components/ImageStyleMixer'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Image Style Mixer" , 
          description: "Takes an existing image and transforms it into the style or apperance indicated by another image" , 
          tutorial: "/genai/image-style-mixer/tutorial/#tutorial",
        }} />
       <ImageStyleMixer />
       </div>
    </div>
  )
}

export default page
