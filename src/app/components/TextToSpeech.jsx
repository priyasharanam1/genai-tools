'use client'
import React, { useEffect, useState } from 'react'
import OutputButtons from './OutputButtons'

const TestTool = () => {
    const ideas = [
        "The sun rises in the east and sets in the west. Birds chirp as they welcome the dawn of a new day. The gentle breeze whispers through the trees, carrying the scent of freshly blooming flowers. It's a beautiful morning filled with endless possibilities.",
        "In a galaxy far, far away, a lone spaceship hurtles through the vast expanse of space. Its crew of intrepid explorers embarks on a daring mission to uncover the secrets of the universe. With each passing moment, they edge closer to the unknown, their hearts filled with hope and determination.",
        "Once upon a time, in a land of myth and magic, a young hero sets out on a quest to save the kingdom from darkness. Armed with courage and determination, they face challenges and obstacles at every turn. But with the help of loyal companions and wise mentors, they journey onward, knowing that their destiny awaits.", 
        "The city streets bustle with life as people go about their daily routines. Cars honk, sirens wail, and pedestrians chatter as they navigate the urban landscape. Amidst the hustle and bustle, a sense of energy and excitement fills the air, reminding everyone that they are part of something bigger than themselves.",
        "Deep in the heart of the jungle, a majestic waterfall cascades down into a crystal-clear pool below. Exotic birds soar overhead, their vibrant plumage catching the sunlight as they dance through the trees. The air is alive with the sounds of nature, a symphony of chirps, calls, and rustling leaves. It's a paradise untouched by time, a sanctuary for all who seek its beauty.",
    
      ]
    const examples =[
        {speech:"/images/texttospeech/example/1.wav" , description :ideas[0]},
        {speech:"/images/texttospeech/example/1.wav" , description :ideas[1]},
        {speech:"/images/texttospeech/example/1.wav" , description :ideas[2]},
        {speech:"/images/texttospeech/example/1.wav" , description :ideas[3]},
        {speech:"/images/texttospeech/example/1.wav" , description :ideas[4]},
      ]
  const [prompt , setPrompt] = useState(-1)
  const [output, setOutput] = useState(null)
  const [isGenerated, setGenerated] = useState("Generate")
  const [text, setText] = useState('')
  //const [scheduler, setScheduler] = useState("1:1")
  //const schedular_options = ["1:1", "9:16"]
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, setPlay] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [timeline, setTimeline] = useState(0);
  useEffect(() => {
      setIsLoaded(true);
  }, []);



  
  useEffect(() => {
    let audio;
    const track = document.getElementById("output-track");
    const loadedDataHandler = () => {
      document.getElementById("output-current").textContent = "0:00";
      document.getElementById("output-end").textContent = new Date(audio.duration * 1000).toISOString().slice(14, 19);
      audio.volume = 0.75;
    };

    const timeUpdateHandler = () => {
      setTimeline(audio.currentTime / audio.duration * 100);
      document.getElementById("output-current").textContent = new Date(audio.currentTime * 1000).toISOString().slice(14, 19);
      if (audio.currentTime === audio.duration) {
        setPlay(true);
      }
    };

    const trackInputHandler = () => {
      audio.currentTime = track.value * audio.duration / 100;
    };

    const playPauseHandler = () => {
      audio.paused ? audio.play() : audio.pause();
    };

    const volumeHandler = () => {
      audio.volume == 0 ? audio.volume = 0.75 : audio.volume = 0;
    };
  
    if (output) {
      setTimeline(0);
      setPlay(true);
      setMuted(false);
      audio = new Audio(output);
  
      audio.addEventListener("loadeddata", loadedDataHandler);
      audio.addEventListener("timeupdate", timeUpdateHandler);
      track.addEventListener("input", trackInputHandler);
      document.getElementById('play_pause').addEventListener('click', playPauseHandler);
      document.getElementById('volume').addEventListener('click', volumeHandler);
    }
  
    return () => {
      // Cleanup when output is null
      if (audio) {
        audio.pause();
        audio.removeEventListener("loadeddata", loadedDataHandler);
        audio.removeEventListener("timeupdate", timeUpdateHandler);
        track.removeEventListener("input", trackInputHandler);
      }
    };
  }, [output]);

  const handleExamplePlay = (id) => {
    // Pause all other audio elements
    for (let i = 0; i < examples.length; i++) {
      if (i !== id) {
        document.getElementById(`example${i}`).pause();
      }
    }
  };
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
    const url ="/api/text-to-speech"
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
            <p >Create a speech from text prompt</p>
        </div>
        <div className="relative mt-6" >
        <textarea maxLength='500' className='placeholder:text-white placeholder:text-opacity-60 max-sm:text-sm   h-[328px] resize-none  border-2 border-[#A1A1A1] rounded-lg w-full p-4  bg-black text-lg scrollbar'
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
        <p className={`pr-4 mt-3 text-white text-opacity-60 text-end ${text.length==500 && "!text-[#ff3737]" }`} >{text.length}/500</p> 
        
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
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-78px)] overflow-y-auto  px-5 md:px-14 py-9  border-r text-white scrollbar">
      <div className='flex flex-col space-y-6'>
        <p>Output</p>
        
        {output ? (
            <div className='max-w-[768px] bg-[#1F1F1F] rounded-lg flex flex-col items-center justify-between h-[206px] p-8'>
                <div  className='flex w-full px-4 py-5 bg-[#292929] rounded-lg text-base space-x-4 items-center'>
                <div id="output-current" className='max-pr-2'>0:00</div>
                
                <input type="range" min="0" max="100" value={timeline} onChange={()=>{}} className='flex flex-1 h-1 transition-all ease-in-out cursor-pointer duration-5000' style={{accentColor:'white'}} id="output-track"></input>
               
                
                <div id="output-end">0:00</div>
                </div>
                <div className="flex items-center justify-between w-full px-2 ">
                <button id="play_pause" onClick={()=>setPlay(!play)}>
                    {play ? (
                        <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="56" height="56" rx="28" fill="#FFC40C"/>
                        <path d="M23.1699 18.6641V37.3307L37.8366 27.9974L23.1699 18.6641Z" fill="black"/>
                        </svg>
                    ):(
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <rect width="56" height="56" rx="28" fill="#FFC40C"/>
                        <path d="M30.6667 37.3337V18.667H36V37.3337H30.6667ZM20 37.3337V18.667H25.3333V37.3337H20Z" fill="black"/>
                        </svg>
                    )}
                </button>
                <button id='volume' onClick={()=>setMuted(!isMuted)}>
                {!isMuted ? (
                 <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1191_2097)">
                <path d="M4.5 12V20H9.83333L16.5 26.6666V5.33331L9.83333 12H4.5ZM22.5 16C22.5 13.64 21.14 11.6133 19.1667 10.6266V21.36C21.14 20.3866 22.5 18.36 22.5 16ZM19.1667 4.30664V7.05331C23.02 8.19997 25.8333 11.7733 25.8333 16C25.8333 20.2266 23.02 23.8 19.1667 24.9466V27.6933C24.5133 26.48 28.5 21.7066 28.5 16C28.5 10.2933 24.5133 5.51997 19.1667 4.30664Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_1191_2097">
                <rect width="32" height="32" fill="white" transform="translate(0.5)"/>
                </clipPath>
                </defs>
                </svg>
                ):(
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 5.33333L13.2133 8.12L16 10.9067M5.69333 4L4 5.69333L10.3067 12H4V20H9.33333L16 26.6667V17.6933L21.6667 23.3733C20.7733 24.0533 19.7733 24.6133 18.6667 24.9333V27.6933C20.5067 27.2667 22.1733 26.4267 23.5733 25.28L26.3067 28L28 26.3067L16 14.3067M25.3333 16C25.3333 17.2533 25.0667 18.4267 24.6133 19.52L26.6267 21.5333C27.5273 19.8279 27.9987 17.9286 28 16C28 10.2933 24 5.52 18.6667 4.30667V7.05333C22.52 8.2 25.3333 11.7733 25.3333 16ZM22 16C22 13.64 20.6667 11.6133 18.6667 10.6267V13.5733L21.9333 16.84C22 16.5733 22 16.28 22 16Z" fill="white"/>
                </svg>
                )}
                </button>
                </div>
            </div>
        ): (isGenerated==="Generating..." )?
        (
        <div className=' max-w-[768px] bg-[#111111] rounded-lg flex justify-center items-center h-[466px]'>
          <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
          background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player></div>
        )   
        :( 
        <div className=' max-w-[768px] bg-[#111111] rounded-lg flex justify-center items-center h-[466px]'>
        <img src="/images/imagestylemixer/defaultImg.png" alt="output1" className="object-contain w-full h-full rounded-lg"/></div>)
        }
      </div>
      {output && <OutputButtons output={output} />}
      <div className='pt-10'>
        <h4 className='mb-6 text-3xl '>Example</h4>

        <div className=''>
          <div  id='examplevid' className='grid gap-6 lg:grid-cols-2'>
            {examples.map((item, i) => {
              return (
                <div key={i} className={`flex flex-col items-center justify-between rounded-lg bg-[#202527] `}>
                  <div></div>
                  <p className={`px-11 py-5 text-center`} >&quot;{item.description}.&quot;</p>
                  
                    <div className='w-full p-2' >
                      <div  className='bg-[#2C2A29] w-full  rounded-lg'>
                      <audio  id={`example${i}`} className='w-full' style={{filter:'invert(0.87)'}} loop controls controlsList='nodownload noplaybackrate' onPlay={() => handleExamplePlay(i)} >
                        <source  src={item.speech} />
                      </audio>  
                      </div>            
                  </div>
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
