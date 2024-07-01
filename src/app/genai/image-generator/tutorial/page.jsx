'use client'
import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import BeImage from "../../../components/BeImage";
import StunningImages from "../../../components/StunningImages";
import NewStyle from "../../../components/NewStyle";
import Discover from "../../../components/Discover";
import Footer from "../../../components/Footer";
import FAQ from "../../../components/FAQ";

const Tut1 = () => {
  return (
    <div>
      <Navbar />
      <Hero
        heading="Transform Words into Art: Try Our Text to Image AI Tool Now!"
        subheading="Unlock Your Creative Potential: Our platform empowers you to turn your ideas into captivating visual artwork effortlessly."
        buttonText="Give it a try"
        testlink="/genai/image-generator"
        tutoriallink="/genai/image-generator/tutorial/#tutorial"
        imageUrl="/images/imagegenerator/Hero Image.png"
      />
      <BeImage toolcategory="Image Generator!"/>
      <StunningImages
        imageUrls={'/images/imagegenerator/StunningImage.png'}
      />
      <div id="steps">
        <NewStyle
          images={[
            "/images/imagegenerator/01.png",
            "/images/imagegenerator/02.png",
            "/images/imagegenerator/03.png",
          ]}
          headings={[
            "Enter Your Prompt",
            "Review and Refine",
            "Download the image",
          ]}
          descriptions={[
            "Click on the input field and enter your prompt text",
            "Evaluate the generated image and refine your prompt if needed",
            "Use the provided option to save the image to your device.",
          ]}
          testlink="/genai/image-generator"
          tutoriallink="/genai/image-generator/tutorial/#tutorial"
          toolcategory="Image Generator"
        />
      </div>

      <FAQ title="Text to image" />
      <Discover  />
      <Footer />
    </div>
  );
};

export default Tut1;
