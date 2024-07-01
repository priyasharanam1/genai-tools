'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import TextToMusic from '../../components/TextToMusic'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Text to Music Generator" , 
          description: "Generate original music composition from a prompt." , 
          tutorial: "/genai/text-to-music/tutorial/#tutorial",
        }} />
       <TextToMusic />
       </div>
    </div>
  )
}

export default page
