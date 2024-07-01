'use client'
import Link from 'next/link'
import React from 'react'

const Header = ({props}) => {
  return (
    <div className='bg-black text-[#F2F2F2] pt-32 pb-14 px-5 md:px-16 gap-5 flex justify-between border-b border-[#A1A1A1]'>
      <div>
        <h1 className='text-4xl font-semibold'>{props.title}</h1>
        <p className='mt-2 text-base max-w-[428px] h-12' >{props.description}</p>
      </div>


      <div className=' text-[#A1A1A1]'>
        <div className='flex items-center gap-5 md:gap-10 max-md:flex-col max-md:items-start'>
        <Link href={props.tutorial} className="flex space-x-[10px]"> 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3L20 12L6 21V3Z" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
           <p> Watch Tutorial</p>
        </Link>
        <Link href="#" className="flex space-x-[10px]" onClick={()=>{navigator.clipboard.writeText(window.location.href)}}> 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.58997 13.51L15.42 17.49" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.41 6.51L8.58997 10.49" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
           <p> Share</p>
        </Link>
        <div >
        <Link href="#" className="flex space-x-[10px] border border-[#A1A1A1] rounded-lg px-5 py-2 hover:bg-[#ff2323] hover:bg-opacity-90 hover:text-white group">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='group-hover:stroke-white' d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className='group-hover:stroke-white' d="M12 8V12" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className='group-hover:stroke-white' d="M12 16H12.01" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
           <p> Report</p>
           </Link>
        </div>

        </div>       
      </div>
    </div>
  )
}

export default Header
