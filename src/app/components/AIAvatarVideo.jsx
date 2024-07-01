'use client'
import React, { useState } from 'react'
import OutputButtons from './OutputButtons'

const AIAvatarVideo = ({image,reset}) => {
  const [output, setOutput] = useState(null)
  const [isGenerated, setGenerated] = useState("Generate")
  const [drop,setDrop] = useState(false)
  const schedular_options = [
    "example_data/motions/motion-01",
    "example_data/motions/motion-02",
    "example_data/motions/motion-03",
    "example_data/motions/motion-04",
    "example_data/motions/motion-05",
    "example_data/motions/motion-06",
    "example_data/motions/motion-07",
    "example_data/motions/motion-08",
    "example_data/motions/motion-09",
  ]
  const [scheduler, setScheduler] = useState(0)

  const handleGenerate = async () => {
    
    setOutput(null)
    setGenerated("Generating...");

    const formData = new FormData()
    formData.append('guidance_data', schedular_options[scheduler])
    formData.append('ref_image_path',image)
    const url ="/api/ai-avatar-video"
    const options={
      method : 'POST',
      body: formData
    }
    try {
      const response = await fetch(url,options )
      let data = await response.json().then(data =>  {
        if (data.detail || data.error) {
          console.log(data ?? 'Something went wrong');
          return null
        } return data.url ?? null;
    });
      setOutput(data)
      setGenerated("Regenerate");
    } catch (error) {
      setGenerated("Generate");
      setOutput(null)
      console.error('Error generating:', error);
    }    
  }

  return (
    <div className="flex">
{/* INPUT */}
      <div className="w-[40vw]   px-5 md:px-14 py-9 bg-black border-r text-white border-[#A1A1A1] h-[calc(100vh-182px)]  overflow-y-auto scrollbar" >
      <div className="flex space-x-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="12" fill="#00B300"/>
        <path d="M17.9997 8.66656L9.99967 16.6666L6.33301 12.9999L7.27301 12.0599L9.99967 14.7799L17.0597 7.72656L17.9997 8.66656Z" fill="white"/>
        </svg>

            <p >AI image generated</p>
        </div>
        <div className="relative my-6"> <img
            src={image}
            alt="uploaded"
            className="object-cover w-full h-full rounded-lg "
          />
          <button onClick={reset} className='absolute p-2 bg-[#141718] border border-[#A1A1A1] rounded-full bg-opacity-90 top-4 right-4 group flex items-center justify-center space-x-1'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 2.5V6.66667H6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <p className='hidden group-hover:flex text-[#A1A1A1]'>Reset</p> 
          </button> </div>
               

          <div className="flex space-x-2 mt-7">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L10.088 8.813C9.99015 9.11051 9.82379 9.38088 9.60234 9.60234C9.38088 9.82379 9.11051 9.99015 8.813 10.088L3 12L8.813 13.912C9.11051 14.0099 9.38088 14.1762 9.60234 14.3977C9.82379 14.6191 9.99015 14.8895 10.088 15.187L12 21L13.912 15.187C14.0099 14.8895 14.1762 14.6191 14.3977 14.3977C14.6191 14.1762 14.8895 14.0099 15.187 13.912L21 12L15.187 10.088C14.8895 9.99015 14.6191 9.82379 14.3977 9.60234C14.1762 9.38088 14.0099 9.11051 13.912 8.813L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 3V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 17V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 5H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 19H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Motions</p>
        </div>
        <div className="relative cursor-pointer w-full  p-4  border-2 border-[#A1A1A1] rounded-xl bg-black text-lg mt-4 " onClick={()=>setDrop(!drop)}> Motion-0{scheduler+1}
        <div className="absolute flex items-center right-4 top-5 ">
            <svg className={`${drop && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#EAECF0" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
        </div>
           <div hidden={!drop} className="border border-[#A1A1A1] rounded-xl w-full mt-2 cursor-pointer ">
            {schedular_options.map((item, index) => (
              <div  key={index} className={`p-4  hover:bg-white hover:bg-opacity-20 ${index==scheduler && " bg-white bg-opacity-20"}`} onClick={()=>{setScheduler(index); setDrop(!drop)}}>
               Motion-0{index+1}
              </div>
            ))}           
            </div> 
        </div>


{/* GENERATE BUTTON */}
        <div className='w-full fixed z-10 bottom-0  px-5 md:px-14 py-7 border-t border-r  border-[#A1A1A1] bg-black'>
          <div className='flex justify-center space-x-4 font-semibold'>
          <button className='flex space-x-2 py-3 px-5 bg-[#141718] rounded-3xl text-[#A1A1A1] items-center justify-center  hover:bg-white hover:bg-opacity-20' onClick={reset}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 2.5V6.66667H6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <p>Reset</p>
            </button>
            <button onClick={handleGenerate} className='flex space-x-2 py-3 px-10 md:px-24 bg-[#FFC40C] hover:brightness-110 rounded-3xl items-center justify-center'>
            <img src="/images/imagestylemixer/generate.png" alt="generate" className="w-6 h-6"/>
            <p>{isGenerated}</p>
            </button>            
          </div>

        </div>


{/* OUTPUT */}
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-182px)] overflow-y-auto  px-5 md:px-14 py-9  border-r text-white scrollbar">
      <div className='flex flex-col space-y-6'>
        <p>Output</p>
        {output ? (
          <div className=' w-[504px] h-[504px] bg-[#111111] rounded-lg'>
             <video loop controls autoPlay className="object-contain w-full h-full rounded-lg ">
              <source src={output} type="video/mp4"/>
            </video>
          </div>
        ): (isGenerated==="Generating..." )?
        (<div className="flex justify-center items-center w-[504px] h-[504px] bg-[#111111] rounded-lg">
          <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
          background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player>
        </div>)   :( <img src="/images/imagestylemixer/defaultImg.png" alt="output1" className="object-contain w-[504px] h-[504px] rounded-lg"/>)
        }
      </div>
      {output && <OutputButtons output={output} />}
      <div className='mt-10 mb-20'>
        <h4 className='mb-6 text-3xl '>Example</h4>
        <img src="/images/aiavatar/example.png" alt="example" className=""/>
        {/* <div className='grid grid-cols-3 gap-4'>
           
          {examples.map((item, index) => {
            return (
              <div key={index} className='bg-[#111111] rounded-xl relative group flex items-center justify-center '>
                <img src={item.image} alt="example" className="group-hover:brightness-[20%] transition-all ease-out duration-200  rounded-xl "/>
                <div className='absolute z-10 items-center hidden h-full p-5 overflow-hidden text-center text-white group-hover:flex'>
                  <p>{item.description}</p>
                  </div>
              </div>
            )
          })} 

        </div> */}
      </div> 
      </div>
   
    </div>

  )
}

export default AIAvatarVideo
