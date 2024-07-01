'use client'
import React, { useEffect, useState } from 'react'
import OutputButtons from './OutputButtons'

const TestTool = () => {
  const [prompt , setPrompt] = useState("")
  const [output, setOutput] = useState(null)
  const [isGenerated, setGenerated] = useState("Generate")
  const [text, setText] = useState('')
  const [scheduler, setScheduler] = useState("K_EULER")
  const [drop,setDrop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      setIsLoaded(true);
  }, []);

  const examples =[
    {image:"/images/imagegenerator/example/1.png" , description : "Photo of a cave in mars, showing vast desert and multiple moon in the sky 4k resolution"},
    {image:"/images/imagegenerator/example/2.png" , description : "Horse running in yellow flower grass with fire in the background cinematic look"},
    {image:"/images/imagegenerator/example/3.png" , description : "A man wearing a robe walking in the path of a dense fog forest"},
    {image:"/images/imagegenerator/example/4.png" , description : "A man in cyber punk city wearing a orange jacket with a camera on the face instead of a face. Looking straight into the camera. Cinematic look, colour grading"},
    {image:"/images/imagegenerator/example/5.png" , description:"A mafia standing in a dark alley, super realistic, 4k"},
    {image:"/images/imagegenerator/example/6.png" , description:"A person walking in the Rain with an umbrella with fog street of Gotham cinematic look"}
  ]

  const ideas = [
    "an anime girl, highly detailed face","a cute cat","beautiful mermaid", "Pikachu, cinematic, digital art", "Vincent Van Gogh mountain", "renaissance portrait"
  ]
  const schedular_options = ["K_EULER", "DPMSolverMultistep",  "DDIM", "K_EULER_ANCESTRAL", "PNDM", "KLMS"]

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert('Please enter prompt..');
      setText("")
      return
    } 
    setOutput(null)
    setGenerated("Generating...");

    const formData = new FormData()
    formData.append('prompt', text)
    formData.append('scheduler', scheduler)
    const url ="/api/image-generator"
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
        } return data.result ?? null;
    });
      setOutput(data)
      setGenerated("Regenerate");
    } catch (error) {
      setGenerated("Generate");
      setOutput(null)
      console.error('Error generating:', error);
    }    
  }
  const reset= () => {
    setText('')
    setOutput(null)
    setGenerated('Generate')
    setPrompt("")
    setScheduler("K_EULER")
  }

  return (
    
    <div className="flex">
{/* INPUT */}
      <div className="w-[40vw]   px-5 md:px-14 py-9 bg-black border-r text-white border-[#A1A1A1] h-[calc(100vh-182px)]  overflow-y-auto scrollbar" >
        <div className="flex space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="22" rx="11" stroke="white" strokeOpacity="0.7" strokeWidth="2"/>
            <path d="M13.7528 6.36364V18H11.9915V8.125H11.9233L9.1392 9.94318V8.26136L12.0426 6.36364H13.7528Z" fill="white"/>
            </svg>
            <p >Create a image from text prompt</p>
        </div>
        <div className="relative mt-6" >
        <textarea maxLength='200' className='placeholder:text-white placeholder:text-opacity-60 max-sm:text-sm   h-[328px] resize-none  border-2 border-[#A1A1A1] rounded-xl w-full p-4  bg-black text-lg '
              type='text'
              onChange={e=>setText(e.target.value)}
              value={text}
              placeholder='For example: A person walking in the rain with an umbrella'
              disabled={!isLoaded}
            />
            <button onClick={()=>{setText("");setPrompt("")}} className='absolute bottom-5 right-4'>
            <svg  width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6V4C7 3 8 2 9 2H13C14 2 15 3 15 4V6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 6H20" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 6V20C18 21 17 22 16 22H6C5 22 4 21 4 20V6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.16406 11V17" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.8359 11V17" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>  </button>    
        </div>
        <p className={`pr-4 mt-3 text-white text-opacity-60 text-end ${text.length==200 && "!text-[#ff3737]" }`} >{text.length}/200</p> 
        <div className="flex space-x-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L10.088 8.813C9.99015 9.11051 9.82379 9.38088 9.60234 9.60234C9.38088 9.82379 9.11051 9.99015 8.813 10.088L3 12L8.813 13.912C9.11051 14.0099 9.38088 14.1762 9.60234 14.3977C9.82379 14.6191 9.99015 14.8895 10.088 15.187L12 21L13.912 15.187C14.0099 14.8895 14.1762 14.6191 14.3977 14.3977C14.6191 14.1762 14.8895 14.0099 15.187 13.912L21 12L15.187 10.088C14.8895 9.99015 14.6191 9.82379 14.3977 9.60234C14.1762 9.38088 14.0099 9.11051 13.912 8.813L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 3V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 17V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 5H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 19H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p >Prompt ideas:</p>
        </div> 
        <div className='flex flex-wrap w-full gap-3 mt-6'>
            {ideas.map((item, index) => {
                return (
                  <button key={index} onClick={()=>{setText(p=>p=="" ? item : p.concat(" "+item).slice(0,200)); setPrompt(item)}} className={`flex px-4 py-2 space-x-2 border text-white text-opacity-60 border-opacity-60 rounded-3xl hover:bg-white  hover:bg-opacity-20 ${(prompt===item)?"bg-white bg-opacity-20":""}`}>{item}</button>
            )})}
          </div>
          <div className="flex space-x-2 mt-7">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Scheduler</p>
        </div>
        <div className="relative cursor-pointer w-full  p-4  border-2 border-[#A1A1A1] rounded-xl bg-black text-lg mt-4 " onClick={()=>setDrop(!drop)}>{scheduler}
        <div className="absolute flex items-center right-4 top-5 ">
            <svg className={`${drop && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#EAECF0" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
        </div>
           <div hidden={!drop} className="border border-[#A1A1A1] rounded-xl w-full mt-2 cursor-pointer ">
            {schedular_options.map((item, index) => (
              <div  key={index} className={`p-4  hover:bg-white hover:bg-opacity-20 ${item==scheduler && " bg-white bg-opacity-20"}`} onClick={()=>{setScheduler(item); setDrop(!drop)}}>
               {item}
              </div>
            ))}           
            </div> 
        </div>


{/* GENERATE BUTTON */}
        <div className='w-full lg:w-[40%] fixed bottom-0  px-5 md:px-14 py-7 border-t border-r  border-[#A1A1A1] bg-black'>
          <div className='flex justify-center space-x-4 font-semibold'>
            <button disabled={!isLoaded} onClick={handleGenerate} className='flex space-x-2 py-3 px-10 md:px-24 bg-[#FFC40C] hover:brightness-110 rounded-3xl'>
            <img src="/images/imagestylemixer/generate.png" alt="generate" className="w-6 h-6"/>
            <p>{isGenerated}</p>
            </button>
            <button className='flex space-x-2 py-3 px-5 bg-[#141718] rounded-3xl text-[#A1A1A1]  hover:bg-white hover:bg-opacity-20' onClick={reset}>
              <p>Reset</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 2.5V6.66667H6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </button>
          </div>

        </div>


{/* OUTPUT */}
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-78px)] overflow-y-auto  px-5 md:px-14 py-9  border-r text-white scrollbar">
      <div className='flex flex-col space-y-6'>
        <p>Output</p>
        {output ? (
          <div className=' w-[504px] h-[504px] bg-[#111111] rounded-lg'>
            <img src={output}  alt="output" className="relative object-contain w-full h-full rounded-xl"/>
          </div>
        ): (isGenerated==="Generating..." )?
        (<div className="flex justify-center items-center w-[504px] h-[504px] bg-[#111111] rounded-lg">
          <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
          background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player>
        </div>)   :( <img src="/images/imagestylemixer/defaultImg.png" alt="output1" className="object-contain w-[504px] h-[504px] rounded-lg"/>)
        }
      </div>
      {output && <OutputButtons output={output} />}
      <div className='mt-10'>
        <h4 className='mb-6 text-3xl '>Example</h4>
        <div className='grid grid-cols-3 gap-4'>
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

        </div>
      </div> 
      </div>
   
    </div>

  )
}

export default TestTool
