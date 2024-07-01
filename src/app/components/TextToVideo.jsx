'use client'
import React, { useEffect, useState } from 'react'
import OutputButtons from './OutputButtons'

const TestTool = () => {
  const [prompt , setPrompt] = useState(-1)
  const [output, setOutput] = useState(null)
  const [isGenerated, setGenerated] = useState("Generate")
  const [text, setText] = useState('')
  const [ index,setIndex] = useState(0)
  //const [scheduler, setScheduler] = useState("1:1")
  //const schedular_options = ["1:1", "9:16"]
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      setIsLoaded(true);
  }, []);

  const ideas = [
    "A stylish woman walks down Tokyo street filled with warm glowing neon and animated signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse. She wears sunglasses and red lipstick. She walks confidently and casually. The street is damp and reflective, creating a mirror effect of the colorful lights. Many pedestrians walk about.",
    "A lone astronaut floats in the vast emptiness of space, surrounded by stars and distant galaxies. Their spacesuit gleams in the sunlight, reflecting the beauty of the cosmos. In the distance, a planet hangs like a delicate blue marble against the velvet blackness of space.",
    "Animated scene features a close-up of a short fluffy monster kneeling beside a melting red candle. The art style is 3D and realistic, with a focus on lighting and texture. The mood of the painting is one of wonder and curiosity, as the monster gazes at the flame with wide eyes and open mouth. Its pose and expression convey a sense of innocence and playfulness, as if it is exploring the world around it for the first time. The use of warm colors and dramatic lighting further enhances the cozy atmosphere of the image.", 
    "Several giant wooly mammoths approach treading through a snowy meadow, their long wooly fur lightly blows in the wind as they walk, snow covered trees and dramatic snow capped mountains in the distance, mid afternoon light with wispy clouds and a sun high in the distance creates a warm glow, the low camera view is stunning capturing the large furry mammal with beautiful photography, depth of field.",
    "Drone view of waves crashing against the rugged cliffs along Big Sur's garay point beach. The crashing blue waters create white-tipped waves, while the golden light of the setting sun illuminates the rocky shore. A small island with a lighthouse sits in the distance, and green shrubbery covers the cliff's edge. The steep drop from the road down to the beach is a dramatic feat, with the cliff's edges jutting out over the sea. This is a view that captures the raw beauty of the coast and the rugged landscape of the Pacific Coast Highway.",

  ]
  const examples =[
    {video:"/images/texttovideo/example/2.mp4" , description :ideas[2]},
    {video:"/images/texttovideo/example/1.mp4" , description : ideas[3]},
    {video:"/images/texttovideo/example/0.mp4" , description : ideas[4]},
  ]
  
  const[more , setMore] = useState(Array(examples.length).fill(true))
  useEffect(() => {
    for (let i = 0; i < examples.length; i++) {
      if (i !== index) {
        document.getElementById(`example${i}`).childNodes[0].pause()
      }
    }
    const video=document.getElementById(`example${index}`)
    document.getElementById(`examplevid`).scrollTo({
        left: video?.offsetLeft || 0 ,
        behavior: "smooth",
      })
      setMore(Array(examples.length).fill(true))
  }, [index])
  
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
    //formData.append('scheduler', scheduler)
    const url ="/api/text-to-video"
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
        } return data;
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
    setPrompt(-1)
    //setScheduler("1:1")
  }

  return (
    
    <div className="flex">
{/* INPUT */}
      <div className="w-[40vw]   px-5 md:px-14 pt-9 pb-24 bg-black border-r text-white border-[#A1A1A1] h-[calc(100vh-182px)]  overflow-y-auto scrollbar" >
        <div className="flex space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="22" rx="11" stroke="white" strokeOpacity="0.7" strokeWidth="2"/>
            <path d="M13.7528 6.36364V18H11.9915V8.125H11.9233L9.1392 9.94318V8.26136L12.0426 6.36364H13.7528Z" fill="white"/>
            </svg>
            <p >Create a Video from text prompt</p>
        </div>
        <div className="relative mt-6" >
        <textarea maxLength='1000' className='placeholder:text-white placeholder:text-opacity-60 max-sm:text-sm   h-[328px] resize-none  border-2 border-[#A1A1A1] rounded-lg w-full p-4  bg-black text-lg scrollbar'
              type='text'
              onChange={e=>setText(e.target.value)}
              value={text}
              placeholder='For example: A person walking in the rain with an umbrella'
              disabled={!isLoaded}
            />
            <button onClick={()=>{setText("");setPrompt(-1)}} className='absolute bottom-5 right-4'>
            <svg  width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6V4C7 3 8 2 9 2H13C14 2 15 3 15 4V6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 6H20" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 6V20C18 21 17 22 16 22H6C5 22 4 21 4 20V6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.16406 11V17" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.8359 11V17" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>  </button>    
        </div>
        <p className={`pr-4 mt-3 text-white text-opacity-60 text-end ${text.length==1000 && "!text-[#ff3737]" }`} >{text.length}/1000</p> 
        
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
        <div className='flex flex-wrap w-full gap-3 pr-8 mt-6'>
            {ideas.map((item, index) => {
                return (
                  <button key={index} onClick={()=>{setText(item); setPrompt(index)}} className={`flex px-4 py-2 text-left  overflow-hidden space-x-2 border text-white text-opacity-60 border-opacity-60 rounded-3xl hover:bg-white  hover:bg-opacity-20 ${(prompt===index)?"bg-white bg-opacity-20":""}`}>
                    <p className='line-clamp-1'>{
                    index%2==0 ? item.slice(0,32)+" ..." : item
                    }</p></button>
            )})}
          </div>
        </div>


{/* GENERATE BUTTON */}
        <div className=' fixed bottom-0 w-full lg:w-[40%]  px-5 md:px-14 py-7 border-t border-r  border-[#A1A1A1] bg-black'>
          <div className='flex justify-center space-x-4 font-semibold'>
            <button  disabled={!isLoaded} onClick={handleGenerate} className='flex space-x-2 py-3 px-10 md:px-24 bg-[#FFC40C] hover:brightness-110 rounded-3xl'>
            <img src="/images/imagestylemixer/generate.png" alt="generate" className="w-6 h-6"/>
            {isGenerated}
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
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-78px)] overflow-y-auto px-5 md:px-14 py-9   border-r text-white scrollbar">
      <div className='flex flex-col space-y-6'>
        <p>Output</p>
        <div className=' max-w-[768px] bg-[#111111] rounded-lg flex justify-center items-center h-[466px]'>
        {output ? (
          <video loop controls autoPlay className="w-full rounded-lg ">
            <source src={output} type="video/mp4"/>
          </video>
        ): (isGenerated==="Generating..." )?
        (
          <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
          background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player>
        )   
        :( 
        <img src="/images/imagestylemixer/defaultImg.png" alt="output1" className="object-contain w-full h-full rounded-lg"/>)
        }</div>
      </div>
      {output && <OutputButtons output={output} />}
      <div className='pt-10'>
        <h4 className='mb-6 text-3xl '>Example</h4>
        <div className='flex items-center justify-center w-full space-x-4'>
          <svg onClick={()=>setIndex(p=>p==0 ? p : p-1 )}  className={`rotate-180 cursor-pointer`} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="white" fillOpacity={` ${index==0 ? '0.02' :'0.1'}`} />
          <path d="M17 26L23 20L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={` ${index==0 && 'stroke-gray-800'}`}/>
          </svg>

          <p>{(index+1)  + " of " +  examples.length }</p>

          <svg onClick={()=>setIndex(p=>p==examples.length-1 ? p : p+1 )} className={` cursor-pointer `} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="white" fillOpacity={` ${index==examples.length-1 ? '0.02' :'0.1'}`} />
          <path d="M17 26L23 20L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={` ${index==examples.length-1 && 'stroke-gray-800'}`}/>
          </svg>
          </div>

        <div className='relative w-full my-10'>
          <div  id='examplevid' className='flex w-full space-x-5 overflow-hidden '>
            {examples.map((item, i) => {
              return (
                <div key={i} id={`example${i}`} className={`flex flex-col items-start justify-start ${i!=index && 'brightness-[20%]'} `}>
                  <video className='w-[40vw] rounded-lg' loop controls = {i==index}>
                    <source  src={item.video} type="video/mp4" />
                  </video> 
                  <p className={`mt-4 w-[40vw] ${more[i] && 'line-clamp-2'}`} >{item.description}</p>
                  <button onClick={() => setMore(p => {
                    let newMore= [...more]
                    newMore[i] = !p[i]
                    return newMore
                  })}
                  className='text-[#A1A1A1] text-sm'>{more[i] ?"More" :"Less"}</button>
                </div>
              )
            })}
          </div>
          </div>

      </div> 
      </div>
   
    </div>

  )
}

export default TestTool
