'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import TextToVideo from '../../components/TextToVideo'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Video Generator" , 
          description: "Generates a Video based on a textual description" , 
          tutorial: "/genai/text-to-video/tutorial/#tutorial",
        }} />
       <TextToVideo />
       </div>
    </div>
  )
}

export default page
