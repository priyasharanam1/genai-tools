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
        heading="Experience the Magic of AI - Blend Artistic Styles onto Your Photos"
        subheading="Unlock Your Imagination: Transform Your Photos with Style Transfer AI - Where Creativity Meets Simplicity and Fun!"
        buttonText="Give it a try"
        testlink="/genai/image-style-mixer"
        tutoriallink="/genai/image-style-mixer/tutorial/#tutorial"
        imageUrl="/images/imagestylemixer/Hero Image.png"
      />
      <BeImage toolcategory="Image Style Mixer!"/>
      <StunningImages
        imageUrls={"/images/imagestylemixer/StunningImage.png"}
      />
      <div id="steps">
        <NewStyle
          images={[
            "/images/1 (1).png",
            "/images/3 (1).png",
            "/images/5 (1).png",
          ]}
          headings={[
            "Upload the image of your choice",
            "Pick style of your choice",
            "Awesome! You've made your first image",
          ]}
          descriptions={[
            "Browse to the image on your computer or drag and drop it onto the Image Style Mixer",
            "Upload your own photo or select one from the  Image Style Mixer gallery",
            "Hang tight a few moments... Voila! Your photo is now ready",
          ]}
          testlink="/genai/image-style-mixer"
          tutoriallink="/genai/image-style-mixer/tutorial/#tutorial"
          toolcategory="Image Style Mixer"
        />
      </div>

      <FAQ title="Image Style Mixer" />
      <Discover  />
      <Footer />
    </div>
  );
};

export default Tut1;
