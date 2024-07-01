'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import ImageGenerator from '../../components/ImageGenerator'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Image Generator" , 
          description: "Generates an image based on a textual description." , 
          tutorial: "/genai/image-generator/tutorial/#tutorial",
        }} />
       <ImageGenerator />
       </div>
    </div>
  )
}

export default page
