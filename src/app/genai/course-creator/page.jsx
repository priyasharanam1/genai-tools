'use client'
import React from 'react'
import NavbarDark from '../../components/NavbarDark'
import ToolHeader from '../../components/ToolHeader'
import CourseCreator from '../../components/CourseCreator'

const page = () => {
  return (
    <div>
        <NavbarDark/>
        <div className='h-[calc(100vh+203px)]'>
        <ToolHeader props={{
          title:"Course Generator" , 
          description: "Generates an course based on a textual description." , 
          tutorial: "/genai/course-creator/tutorial/#tutorial",
        }} />
       <CourseCreator />
       </div>
    </div>
  )
}

export default page
