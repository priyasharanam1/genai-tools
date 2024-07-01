'use client'
import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { images, steps, descriptions,links,tags } from "../Discover_helper";
const Discover = () => {  
  return (
    <div id="tools" className="bg-[#18181B]">
      <div className="flex flex-col items-center py-16 ">
        <div className="font-semibold text-[#F2F2F2] text-[2rem] tracking-tight text-center ">
          Dive into the World of AI
        </div>
        <div className="mt-2 text-center text-white">
          Discover, Experiment, and Innovate with Our Array of Cutting-Edge
          Tools
        </div>
        <div className="grid justify-center gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 mb-28">
          {images.map((img, index) => (
            <Link
              key={index}
              href={links[index]}
              className="flex flex-col w-[360px] gap-1 cursor-pointer justify-between group">
              <div>
              <img
                src={img}
                className="rounded-tl-xl rounded-tr-xl w-[360px] group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <span className="font-semibold text-[20px] text-[#F2F4F7] mt-4 flex justify-between">
                {steps[index]} <div className="transition-transform duration-200 ease-in-out group-hover:rotate-45"><MdArrowOutward /></div>
              </span>
              <p className="text-[16px] text-[#98A2B3]">
                {descriptions[index]}
              </p>
              </div>
              <div className="flex gap-3 mt-2">
                {tags[index].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[14px] text-white font-medium rounded-full border-2 border-white border-opacity-10 bg-white bg-opacity-5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Discover;
