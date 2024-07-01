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
        testlink="/genai/text-to-speech"
        tutoriallink="/genai/text-to-speech/tutorial/#tutorial"
        imageUrl="/images/texttospeech/hero.png"
      />
      <BeImage toolcategory="Speech Generator!"/>
      <div className='px-5 mt-10 md:mx-24'>
      <div className="flex flex-col items-center m-auto">
          <div className="font-semibold text-[2rem] tracking-tight max-w-[500px] text-center ">
            Create stunning speeches like these with our user-friendly tool!
          </div>
        </div>
          <div  id='examplevid' className='grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3'>
            {examples.map((item, i) => {
              return (
                <div key={i}  className={`flex flex-col items-center justify-between rounded-lg bg-[gray]  bg-opacity-10 `}>
                  <div></div>
                  <p className={`px-11 py-5 text-center`} >&quot;{item.description}.&quot;</p>
                  
                    <div className='w-full p-2' >
                      <div  className='bg-[#2C2A29] w-full  rounded-lg'>
                      <audio id={`example${i}`} className='w-full' style={{filter:'invert(0.87)'}}  loop controls controlsList='nodownload noplaybackrate' onPlay={() => handleExamplePlay(i)}>
                        <source  src={item.speech} />
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
            "/images/texttospeech/step-1.png",
            "/images/texttospeech/step-2.png",
            "/images/texttospeech/step-3.png",
          ]}
          headings={[
            "Enter Your Prompt",
            "Review and Refine",
            "Download the Audio",
          ]}
          descriptions={[
            "Start with prompting. Submit a text prompt for the speech",
            "Evaluate the generated audio and refine your prompt if needed",
            "Wait for magic to happen. A speech would be generated matching the requested specifications.",
          ]}
          testlink="/genai/text-to-speech"
          tutoriallink="/genai/text-to-speech/tutorial/#tutorial"
          toolcategory="Image Generator"
        />
      </div>

      <FAQ title="Speech Generator" />
      <Discover  />
      <Footer />
    </div>
  );
};

export default Tut1;
