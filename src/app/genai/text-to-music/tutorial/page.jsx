'use client'
import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import BeImage from "../../../components/BeImage";
import NewStyle from "../../../components/NewStyle";
import Discover from "../../../components/Discover";
import Footer from "../../../components/Footer";
import FAQ from "../../../components/FAQ";

const Tut1 = () => {
  const ideas = [
    "Create a piece in the style of Baroque era, incorporating intricate counterpoint and ornamentation, building towards a grand finale with a majestic brass fanfare.",
    "Craft a minimalist composition inspired by Philip Glass, featuring repetitive patterns that gradually intensify in complexity, culminating in a soaring melodic line accompanied by lush strings.", 
    "Imagine a fusion of electronic and classical elements, blending pulsating synths with sweeping orchestral arrangements, leading to a climactic drop that transitions into a serene, ethereal section.",
    "Develop a jazz-infused composition reminiscent of the 1950s era, characterized by swinging rhythms and improvisational solos, building towards a dynamic climax with a full ensemble improvisation.",
    "Create a modern film score evoking the vastness of space, using expansive harmonies and shimmering textures to convey a sense of cosmic wonder, building towards a transcendent resolution accompanied by celestial choir voices."
  ]
    const examples =[
        {music:"/images/texttomusic/example/out0.mp3" , description :ideas[0] , image:"/images/texttomusic/example/image0.png"},
        {music:"/images/texttomusic/example/out1.mp3" , description :ideas[1] , image:"/images/texttomusic/example/image1.png"},
        {music:"/images/texttomusic/example/out2.mp3" , description :ideas[2], image:"/images/texttomusic/example/image2.png"},
        {music:"/images/texttomusic/example/out3.mp3" , description :ideas[3] , image:"/images/texttomusic/example/image3.png"},
        {music:"/images/texttomusic/example/out4.mp3" , description :ideas[4] , image:"/images/texttomusic/example/image4.png"},
    ]
    
  const handleExamplePlay = (id) => {
    // Pause all other audio elements
    for (let i = 0; i < examples.length; i++) {
      if (i !== id) {
        document.getElementById(`example${i}`).pause();
      }
    }
  };
  return (
    <div>
      <Navbar />
      <Hero
        heading="Bring Your Imagination to Life - Transform Ideas into Stunning Visual Artwork!"
        subheading="Unlock Your Creative Potential: Our platform empowers you to turn your ideas into captivating visual artwork effortlessly."
        buttonText="Give it a try"
        testlink="/genai/text-to-music"
        tutoriallink="/genai/text-to-music/tutorial/#tutorial"
        imageUrl="/images/texttomusic/hero.png"
      />
      <BeImage toolcategory="Music Generator!"/>
      <div className='px-5 mt-10 md:mx-24'>
      <div className="flex flex-col items-center m-auto">
          <div className="font-semibold text-[2rem] tracking-tight max-w-[500px] text-center ">
            Create stunning music like these with our user-friendly tool!
          </div>
        </div>
          <div  id='examplevid' className='grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3'>
            {examples.map((item, i) => {
              return (
                <div key={i} className={`flex flex-col items-center justify-between rounded-lg bg-[gray]  bg-opacity-10  text-white group`}>
                <div className='relative w-full p-3 pb-0'>
                  <img src={item.image} alt="example" className='object-cover w-full rounded-lg brightness-75 group-hover:brightness-100'/>
                  <div className='absolute text-xs bottom-3 right-6 left-6'>
                  <p>{item.description}</p>
                  </div>
                
                </div>
                  
                    <div className='w-full p-3' >
                      <div  className='bg-[#2C2A29] w-full  rounded-lg'>
                      <audio id={`example${i}`} className='w-full' style={{filter:'invert(0.87)'}}  loop controls controlsList='nodownload noplaybackrate' onPlay={() => handleExamplePlay(i)}>
                        <source  src={item.music} />
                      </audio>  
                      </div>            
                  </div>
                </div>
              )
            })}
          </div>
      </div>
      


      <div id="steps">
        <NewStyle
          images={[
            "/images/texttomusic/step-1.png",
            "/images/texttomusic/step-2.png",
            "/images/texttomusic/step-3.png",
          ]}
          headings={[
            "Enter Your Prompt",
            "Review and Refine",
            "Download the Audio",
          ]}
          descriptions={[
            "Start with prompting. Submit a text prompt for the music",
            "Evaluate the generated audio and refine your prompt if needed",
            "Wait for magic to happen. A music would be generated matching the requested specifications.",
          ]}
          testlink="/genai/text-to-music"
          tutoriallink="/genai/text-to-music/tutorial/#tutorial"
          toolcategory="Image Generator"
        />
      </div>

      <FAQ title="Music Generator" />
      <Discover  />
      <Footer />
    </div>
  );
};

export default Tut1;
