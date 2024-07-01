'use client'
import React from 'react'
import download from 'downloadjs' 

const OutputButtons = ({output}) => {
  return (
    <>
    <div className="flex mt-6 space-x-5">
        <div className="flex items-center px-5 py-1 space-x-3 border rounded-full border-[#A1A1A1] ">
          {/* like */}
        <button className='hover:scale-110' onClick={()=> {
            const likeBtn = document.getElementById('likebtn');
            likeBtn.getAttribute("fill")==="#f34747" ? likeBtn.setAttribute("fill", "none") : likeBtn.setAttribute("fill", "#f34747");
        }}> 
        <svg id="likebtn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
        <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1V21" stroke="#808080" strokeOpacity="0.6" strokeLinecap="round"/>
        </svg>

        {/* download */}
        <button className='hover:scale-125'  onClick={()=>{download(output); document.getElementById('setText').innerHTML="File Downloaded"; setTimeout(() => {
                document.getElementById('setText').innerHTML = "";}, 2000);}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15V3" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
        <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1V21" stroke="#808080" strokeOpacity="0.6" strokeLinecap="round"/>
        </svg>
        {/* share */}
        <button className='hover:scale-110'  onClick={()=>{navigator.clipboard.writeText(output) ; document.getElementById('setText').innerHTML="Link Copied";  setTimeout(() => {
                document.getElementById('setText').innerHTML = "";}, 2000);}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.58984 13.51L15.4198 17.49" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.4098 6.51001L8.58984 10.49" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        </div>
        {/* Feedback */}
        <button  className="flex items-center px-6 py-3 space-x-3 border rounded-full border-[#A1A1A1] hover:bg-white hover:bg-opacity-10">
          <p>Feedback</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.375 2.62498C18.7728 2.22716 19.3124 2.00366 19.875 2.00366C20.4376 2.00366 20.9772 2.22716 21.375 2.62498C21.7728 3.02281 21.9963 3.56237 21.9963 4.12498C21.9963 4.68759 21.7728 5.22716 21.375 5.62498L12 15L8 16L9 12L18.375 2.62498Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p id="setText" className='items-center flex text-[#ff3737]'></p>
        </div>
        
    </>
  )
}

export default OutputButtons
