'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import TextToSpeech from '../../components/TextToSpeech'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Text to Speech Generator" , 
          description: "Generates an audio file (e.g., speech) based on provided text." , 
          tutorial: "/genai/text-to-speech/tutorial/#tutorial",
        }} />
       <TextToSpeech />
       </div>
    </div>
  )
}

export default page
