'use client'
import React from "react";

const Innovation = () => {
  return (
    <div className="bg-[#18181B]">
      <div className="flex py-16 flex-col m-auto items-center px-5 max-w-[600px]">
        <div className="font-semibold text-[#F2F2F2] text-[2rem] tracking-tight text-center ">
          Step into a world of innovation and discovery
        </div>
        <div className="mt-2 text-center text-white text-opacity-70">
          Delve deep into the transformative power of AI tools designed to
          revolutionize the way you work, learn, and create.
        </div>
      </div>
      <div className=" flex items-center justify-center px-5 max-w-[1080px] mx-auto">
        <img
          src="/images/Wireframe - 3 3.png"
          width="1080px"
          height="633px"
          alt="YouTube video thumbnail"
        />
      </div>
      <div className="text-white text-opacity-70 max-w-[700px] mt-4 flex mx-auto text-center pt-10 pb-20 px-20">
        Explore the realms of your imagination with generate mode. Achieve your
        goals with exclusive AI tools, text to image, image to image, variations
        and styles.
      </div>
    </div>
  );
};

export default Innovation;
