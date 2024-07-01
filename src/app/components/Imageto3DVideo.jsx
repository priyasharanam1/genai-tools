"use client";
import React, { useState } from "react";
import OutputButtons from "./OutputButtons";

const TestTool = () => {
  const [image, setImage] = useState(null);
  const [clickedItem, setClickedItem] = useState("");
  const imageSamples = [
    "/images/imageto3dvideo/samples/Image-6.png",
    "/images/imageto3dvideo/samples/Image-7.png",
    "/images/imageto3dvideo/samples/Image-8.png",
    "/images/imageto3dvideo/samples/Image-0.png",
    "/images/imageto3dvideo/samples/Image-1.png",
    "/images/imageto3dvideo/samples/Image-2.png",
    "/images/imageto3dvideo/samples/Image-3.png",
    "/images/imageto3dvideo/samples/Image-4.png",
    "/images/imageto3dvideo/samples/Image-5.png",
  ];
 
  const examples = [
    {image :"/images/imageto3dvideo/examples/0.png" , model : "/images/imageto3dvideo/examples/0.glb"},
    {image :"/images/imageto3dvideo/examples/1.png" , model : "/images/imageto3dvideo/examples/1.glb"},
    {image :"/images/imageto3dvideo/examples/2.jpg" , model : "/images/imageto3dvideo/examples/2.glb"},
    {image :"/images/imageto3dvideo/examples/3.png" , model : "/images/imageto3dvideo/examples/3.glb"},
    {image :"/images/imageto3dvideo/examples/4.jpg" , model : "/images/imageto3dvideo/examples/4.glb"},
    {image :"/images/imageto3dvideo/examples/5.jpg" , model : "/images/imageto3dvideo/examples/5.glb"},
  ]
  const [isGenerated, setGenerated] = useState("Generate");
  const [output, setOutput] = useState(null);
 
  const [imgRow, setImgRow] = useState(2);
 
  const reset = () => {
    setImage(null);
    setOutput(null);
    setGenerated("Generate");
    setClickedItem("");
  };
 
  const checkFile = (image) => {
    const MAX_image_SIZE = 10485760;
    if (image && image.size <= MAX_image_SIZE) {
    } else {
      alert("Please select a image up to 10MB in size.");
      return false;
    }
    if (image && !image.type.includes("image/")) {
      alert("Please select an image.");
      return false;
    }
    return true;
  };
  const handleImageChange = (e) => {
    const reader = new FileReader();
    const image = e.target.files[0];
    if (image && checkFile(image)) {
      reader.readAsDataURL(image);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };
  const handleImageDrag = (e) => {
    e.preventDefault();
  };
  const handleImageDrop = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const image = e.dataTransfer.files[0];
    if (image && checkFile(image)) {
      reader.readAsDataURL(image);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };
  const handleImageClick = async (item) => {
    const reader = new FileReader();
    let img = await fetch(item);
    let img_blob = await img.blob();
    reader.readAsDataURL(img_blob);
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };
 
  const handleGenerate = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    setOutput(null);
    setGenerated("Generating...");
    const formData = new FormData();
    formData.append("Image_url", image);
    const url = "/api/image-to-3d-video";
    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(url, options);
      let data = await response.json().then((data) =>{
        if (data.detail || data.error) {
          console.log(data ?? 'Something went wrong');
          return null
        } return  data.url ?? null
    }) ;
      setOutput(data);
      setGenerated("Regenerate");
    } catch (error) {
      setGenerated("Generate");
      setOutput(null);
      console.error("Error generating:", error);
    }
  };
  return (
    <div className="flex bg-black">
      {/* INPUT */}
      <div className="w-[40vw]   px-5 md:px-14 py-9 bg-black border-r text-white border-[#A1A1A1] h-[calc(100vh-182px)]  overflow-y-auto scrollbar">
        <div className="flex space-x-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="11"
              stroke="white"
              strokeOpacity="0.7"
              strokeWidth="2"
            />
            <path
              d="M13.7528 6.36364V18H11.9915V8.125H11.9233L9.1392 9.94318V8.26136L12.0426 6.36364H13.7528Z"
              fill="white"
            />
          </svg>
          <p>Choose or upload the image of your choice</p>
        </div>
        <div
          className="mt-6 h-[404px] flex justify-center"
          onDragOver={handleImageDrag}
          onDrop={handleImageDrop}
        >
          {!image ? (
            <label
              htmlFor="imageInput"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center ">
                <p className="mb-1 text-lg text-[#F2F2F2]">
                  Choose a image or drag & drop it here
                </p>
                <p className="text-sm text-white text-opacity-70">
                  JPEG, PNG, TIF, and SVG formats, up to 10MB
                </p>
              </div>
              <button
                onClick={() => {
                  document.getElementById("imageInput").click();
                }}
                className="px-5 py-2 mt-8 border rounded-lg hover:bg-white hover:bg-opacity-20"
              >
                Browse File
              </button>
              <input
                id="imageInput"
                type="file"
                accept=".jpeg, .jpg, .png, .tif, .tiff, .svg"
                className="hidden"
                onChange={handleImageChange}
                onDragOver={handleImageDrag}
                onDrop={handleImageDrop}
              />
            </label>
          ) : (
            <div className="relative"> <img
            src={image}
            alt="uploaded"
            className="object-contain h-full rounded-lg "
          />
          <button onClick={(e) => {
              setImage(null);
              setClickedItem((p) => ["", p[1]]);
            }} className='absolute p-2 bg-[#141718] rounded-lg bg-opacity-20 top-4 right-4'>
            <svg  width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6V4C7 3 8 2 9 2H13C14 2 15 3 15 4V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 6H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 6V20C18 21 17 22 16 22H6C5 22 4 21 4 20V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.16406 11V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.8359 11V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>  </button> </div>
          )}
        </div>
 
        <p className="py-6 text-white">Or try with one of the samples</p>
 
        <div className="relative grid grid-cols-3 gap-4 ">
          {imageSamples.slice(0, imgRow * 3).map((item, index) => {
            return (
              <div key={index} className="flex justify-center">
                <img
                  onClick={() => {
                    handleImageClick(item);
                    setClickedItem(item);
                  }}
                  src={item}
                  alt="sample"
                  className={`object-cover w-[136px] h-[136px] rounded-lg cursor-pointer hover:brightness-100  ${
                    clickedItem == item ? "border-2" : "brightness-[60%]"
                  }`}
                />
              </div>
            );
          })}
          {imageSamples.length > 6 && (
            <div className="absolute bottom-0 flex justify-center w-full ">
              <button
                className="flex items-center px-4 py-2 space-x-3 text-lg text-white rounded-lg hover:bg-white hover:bg-opacity-20 text-opacity-90"
                onClick={() => {
                  imgRow === 2
                    ? setImgRow(Math.ceil(imageSamples.length / 3))
                    : setImgRow(2);
                }}
              >
                <p>{imgRow === 2 ? "View All" : "View Less"}</p>
                <svg
                  className={`${imgRow !== 2 && "rotate-180"} `}
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L13 1.5"
                    stroke="white"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
 
      {/* GENERATE BUTTON */}
      <div className="w-full lg:w-[40%] fixed bottom-0  px-5 md:px-14 py-7 border-t border-r  border-[#A1A1A1] bg-black">
        <div className="flex justify-center space-x-4 font-semibold">
          <button
            onClick={handleGenerate}
            className="flex space-x-2 py-3 px-10 md:px-24 bg-[#FFC40C] hover:brightness-110 rounded-3xl"
          >
            <img
              src="/images/imagestylemixer/generate.png"
              alt="generate"
              className="w-6 h-6"
            />
            <p>{isGenerated}</p>
          </button>
          <button
            className="flex space-x-2 py-3 px-5 bg-[#141718] rounded-3xl text-[#A1A1A1]  hover:bg-white hover:bg-opacity-20"
            onClick={reset}
          >
            <p>Reset</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667"
                stroke="#A1A1A1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 2.5V6.66667H6.66667"
                stroke="#A1A1A1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
 
      {/* OUTPUT */}
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-77px)] overflow-y-auto  px-5 md:px-14 py-9  border-r text-white scrollbar">
        <div className="flex flex-col space-y-6">
          <p>Output</p>
          {output ? (
            <div className="flex justify-center items-center w-[504px] h-[504px] bg-[#111111] rounded-lg">
              <model-viewer auto-rotate camera-controls  src={output} alt="output"  style={{ width: '100%', height: '100%', objectFit: 'contain' }}></model-viewer>
            </div>
          ) : (isGenerated==="Generating..." )?
          (<div className="flex justify-center items-center w-[504px] h-[504px] bg-[#111111] rounded-lg">
            <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
            background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player>
          </div>)
          : (
            <img
              src="/images/imagestylemixer/defaultImg.png"
              alt="output1"
              className="object-contain w-[504px] h-[504px] rounded-lg"
            />
          )}
        </div>
        {output && <OutputButtons output={output} />}
        <div className="mt-10 ">
          <h4 className="mb-6 text-3xl">Example</h4>
          <div className="flex">
            <div className="grid grid-cols-2 gap-12">
            {examples.map((item, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-center items-center bg-[#111111] rounded-2xl">
                  <img src={item.image} alt="example" style={{ width: '100%', height: '100%', objectFit: 'contain' ,borderRadius:'16px' }} />
                </div>
                <div className="flex justify-center items-center bg-[#111111] rounded-2xl">
                  <model-viewer auto-rotate src={item.model} alt="output" style={{ width: '100%', height: '100%', objectFit: 'contain' }}></model-viewer>
                </div>
              </React.Fragment>
            ))}      
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
 
export default TestTool;
 