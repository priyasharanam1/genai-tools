'use client'
import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import BeImage from "../../../components/BeImage";
import NewStyle from "../../../components/NewStyle";
import Discover from "../../../components/Discover";
import Footer from "../../../components/Footer";
import FAQ from "../../../components/FAQ";
import StunningImages from "../../../components/StunningImages";

const Tut1 = () => {
  
  return (
    <div>
      <Navbar />
      <Hero
        heading="Bring Your Imagination to Life - Transform Ideas into Stunning Visual Artwork!"
        subheading="Unlock Your Creative Potential: Our platform empowers you to turn your ideas into captivating visual artwork effortlessly."
        buttonText="Give it a try"
        testlink="/genai/ai-avatar"
        tutoriallink="/genai/ai-avatar/tutorial/#tutorial"
        imageUrl="/images/aiavatar/hero.png"
      />
      <BeImage toolcategory="AI Avatar Generator"/>
      <StunningImages imageUrls={'/images/aiavatar/stunningimage.png'} />
      <div id="steps">
        <NewStyle
          images={[
            "/images/aiavatar/1.png",
            "/images/aiavatar/2.png",
            "/images/aiavatar/3.png",
          ]}
          headings={[
            "Create Your Avatar",
            "Write Your Script",
            "Watch Your Avatar Speak",
          ]}
          descriptions={[
            "Start by entering a prompt to generate an AI avatar.",
            "Use the text box to write a script for what you want your AI avatar to say.",
            "The AI will take your prompt-generated avatar and bring it to life!",
          ]}
          testlink="/genai/ai-avatar"
          tutoriallink="/genai/ai-avatar/tutorial/#tutorial"
          toolcategory="Image to 3D Video"
        />
      </div>


      <FAQ title="AI Avatar Generator" />
      <Discover />
      <Footer />
    </div>
  );
};

export default Tut1;
