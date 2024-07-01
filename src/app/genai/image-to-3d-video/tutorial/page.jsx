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
  const examples = [
    {image :"/images/imageto3dvideo/examples/0.png" , model : "/images/imageto3dvideo/examples/0.glb"},
    {image :"/images/imageto3dvideo/examples/1.png" , model : "/images/imageto3dvideo/examples/1.glb"},
    {image :"/images/imageto3dvideo/examples/2.jpg" , model : "/images/imageto3dvideo/examples/2.glb"},
    {image :"/images/imageto3dvideo/examples/3.png" , model : "/images/imageto3dvideo/examples/3.glb"},
    {image :"/images/imageto3dvideo/examples/4.jpg" , model : "/images/imageto3dvideo/examples/4.glb"},
    {image :"/images/imageto3dvideo/examples/5.jpg" , model : "/images/imageto3dvideo/examples/5.glb"},
  ]
  return (
    <div>
      <Navbar />
      <Hero
        heading="Bring Your Imagination to Life - Transform Ideas into Stunning Visual Artwork!"
        subheading="Unlock Your Creative Potential: Our platform empowers you to turn your ideas into captivating visual artwork effortlessly."
        buttonText="Give it a try"
        testlink="/genai/image-to-3d-video"
        tutoriallink="/genai/image-to-3d-video/tutorial/#tutorial"
        imageUrl="/images/imageto3dvideo/Group 33 2.png"
      />
      <BeImage toolcategory="Image Generator"/>
      <div className="px-5 mt-28">
      <div className="flex flex-col items-center m-auto">
        <div className="font-semibold text-[2rem] tracking-tight max-w-[500px] text-center ">
          Create stunning models like these with our user-friendly tool!
        </div>
      </div>
      <div className="flex sm:mx-24 my-14">
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
            {examples.map((item, i) => (
                <div key={i} className="flex w-[100%] h-[350px] justify-center items-center bg-[gray]  bg-opacity-10 shadow-md rounded-2xl">
                  <model-viewer auto-rotate src={item.model} alt="output" style={{ width: '100%', height: '100%', objectFit: 'contain' }}></model-viewer>
                </div>
            ))}      
            </div>
          </div>
    </div>
      <div id="steps">
        <NewStyle
          images={[
            "/images/imageto3dvideo/image to video 3 1.png",
            "/images/imageto3dvideo/image to video 3 1 (1).png",
            "/images/imageto3dvideo/image to video 3 1 (2).png",
          ]}
          headings={[
            "Upload the image",
            "Hit the generate button",
            "Preview & Export",
          ]}
          descriptions={[
            "Begin by uploading your desired static image",
            "Once you upload the image hit the generate but to generate your video.",
            "preview the animated result in real-time. Once satisfied, download it",
          ]}
          testlink="/genai/image-to-3d-video"
          tutoriallink="/genai/image-to-3d-video/tutorial/#tutorial"
          toolcategory="Image to 3D Video"
        />
      </div>


      <FAQ title="Image To 3D Video" />
      <Discover />
      <Footer />
    </div>
  );
};

export default Tut1;
