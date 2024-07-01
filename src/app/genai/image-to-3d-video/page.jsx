'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import Imageto3DVideo from '../../components/Imageto3DVideo'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Image to 3D Video" , 
          description: "Generates an 3D Video from image." , 
          tutorial: "/genai/image-to-3d-video/tutorial/#tutorial",
        }} />
       <Imageto3DVideo />
       </div>
    </div>
  )
}

export default page
