'use client'
import React, { useEffect, useState } from "react";

const StunningVideos = () => {
  
  const [ index,setIndex] = useState(0)
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
  return (
    <div className="flex flex-col items-center justify-center px-5 md:mx-24 mt-28">
      <div className="font-semibold text-[2rem] tracking-tight max-w-[500px] text-center ">
          Create stunning videos like these with our user-friendly tool!
        </div>
        <div className='flex items-center justify-center w-full mt-10 space-x-4'>
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setIndex(p=>p==0 ? p : p-1 )} className={` cursor-pointer rotate-180 `}>
          <rect x="0.5" y="0.455078" width="40" height="40" rx="20" fill="black"  fillOpacity={` ${index==0 ? '0.02' :'0.1'}`}/>
          <path d="M17.5 26.4551L23.5 20.4551L17.5 14.4551" stroke="#141718" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className={` ${index==0 && 'stroke-gray-800'}`}/>
          </svg>

          <p>{(index+1)  + " of " +  examples.length }</p>

          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setIndex(p=>p==examples.length-1 ? p : p+1 )} className={` cursor-pointer `}>
          <rect x="0.5" y="0.455078" width="40" height="40" rx="20" fill="black"  fillOpacity={` ${index==examples.length-1 ? '0.02' :'0.1'}`}/>
          <path d="M17.5 26.4551L23.5 20.4551L17.5 14.4551" stroke="#141718" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className={` ${index==examples.length-1 && 'stroke-gray-800'}`}/>
          </svg>
  
          </div>

        <div className='relative w-full mt-10 ml-5 md:ml-24'>
          <div  id='examplevid' className='flex w-full space-x-5 overflow-hidden '>
            {examples.map((item, i) => {
              return (
                <div key={i} id={`example${i}`} className={`flex flex-col items-start justify-start  ${i!=index && 'brightness-[20%]'} `}>
                <video className='w-[55vw]  object-cover rounded-lg' loop controls = {i==index}>
                    <source src={item.video} type="video/mp4" />
                  </video> 
                  <p className={`mt-4 w-[55vw]  ${more[i] && 'line-clamp-2'}`} >{item.description}</p>
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
  );
};

export default StunningVideos;
