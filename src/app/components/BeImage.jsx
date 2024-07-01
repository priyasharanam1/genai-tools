'use client'
import React from "react";

const BeImage = ({toolcategory}) => {
  return (
    <div className="mt-12" id="tutorial">
      <div className="flex flex-col items-center px-5 m-auto">
        <div className="font-semibold text-[2rem] tracking-tight max-w-[480px] text-center ">
          Explore the capabilities of our AI-powered {toolcategory}
        </div>
        <div className="text-[#667085] text-center mt-2">
          Discover How Easy It Is: Watch the Video Tutorial on Using Our AI
          Tool!
        </div>
        <div className="w-full mt-14 max-w-[1080px]" > 
          <iframe className="rounded-2xl"
            
            width={"100%"}
            height="633"
            src="https://www.youtube.com/embed/vTufphdowOw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BeImage;
