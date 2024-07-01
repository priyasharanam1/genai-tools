'use client'
import React from "react";

const StunningImages = ({ imageUrls }) => {
  return (
    <div className="px-5 mt-28">
      <div className="flex flex-col items-center m-auto">
        <div className="font-semibold text-[2rem] tracking-tight max-w-[500px] text-center ">
          Create stunning images like these with our user-friendly tool!
        </div>
      </div>
      <img src={imageUrls} width='1000x' height='650px' className="flex mx-auto my-14"/>
    </div>
  );
};

export default StunningImages;
