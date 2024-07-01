'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import AIAvatar from '../../components/AIAvatar'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"AI Avatar Generator" , 
          description: "Generates an AI Avatar based on a textual description." , 
          tutorial: "/genai/ai-avatar/tutorial/#tutorial",
        }} />
       <AIAvatar />
       </div>
    </div>
  )
}

export default page
