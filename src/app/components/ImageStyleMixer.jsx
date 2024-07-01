'use client'
import React, { useEffect, useState } from 'react'
import OutputButtons from './OutputButtons'

const TestTool = () => {
  const [image, setImage] = useState(null)
  const [clickedItem , setClickedItem] = useState(["",""])
  const imageSamples= [
    "/images/imagestylemixer/imgsample/Image-0.png" ,
    "/images/imagestylemixer/imgsample/Image-1.png" ,
    "/images/imagestylemixer/imgsample/Image-2.png" ,
    "/images/imagestylemixer/imgsample/Image-3.png" ,
    "/images/imagestylemixer/imgsample/Image-4.png" ,
    "/images/imagestylemixer/imgsample/Image-5.png" ,
    "/images/imagestylemixer/imgsample/image-6.png" ,
    "/images/imagestylemixer/imgsample/image-7.png" ,
    "/images/imagestylemixer/imgsample/image-8.png" ,
    "/images/imagestylemixer/imgsample/image-9.png" ,
    "/images/imagestylemixer/imgsample/image-10.png" ,
    "/images/imagestylemixer/imgsample/image-11.png" ,
    "/images/imagestylemixer/imgsample/image-12.png" ,
    "/images/imagestylemixer/imgsample/image-13.png" ,
    "/images/imagestylemixer/imgsample/image-14.png" ,
  ]
  const [style, setStyle] = useState(null)
  const categoryStyles = {
    All : [],
    Anime: [
      '/images/imagestylemixer/stylesample/Image-8.png',
      '/images/imagestylemixer/stylesample/Image-9.png',
      '/images/imagestylemixer/stylesample/image-12.png',
      '/images/imagestylemixer/stylesample/image-13.png',
      '/images/imagestylemixer/stylesample/image-14.png'
    ],
    Comic: [
      '/images/imagestylemixer/stylesample/Image-6.png'
    ],
    Cyberpunk: [
      '/images/imagestylemixer/stylesample/Image-1.png',
      '/images/imagestylemixer/stylesample/Image-2.png'
    ],
    'Digital Art': [
      '/images/imagestylemixer/stylesample/Image-5.png',
      '/images/imagestylemixer/stylesample/Image-10.png'
    ],
    'Fantasy 3D': [
      '/images/imagestylemixer/stylesample/Image-3.png',
      '/images/imagestylemixer/stylesample/Image-4.png'
    ],
    Painting: [
      '/images/imagestylemixer/stylesample/Image-0.png',
      '/images/imagestylemixer/stylesample/image-11.png'
    ],
    Photo: [
      '/images/imagestylemixer/stylesample/Image-7.png',
    ],    
  }
 
  const [category, setCategory] = useState("All")
  const [filteredCategories, setFilteredCategories] = useState([])
  useEffect(() => {
    setFilteredCategories( p=> (category === "All" ) ? Object.values(categoryStyles).flat() :categoryStyles[category] ) }, [category])
 
  const [isGenerated, setGenerated] = useState("Generate")
  const [output, setOutput] = useState(null)
  const [originalImg, setOriginalImg] = useState(false)
 
  const [imgRow, setImgRow] = useState(2)
  const [styleRow, setStyleRow] = useState(2)
 
  const reset= () => {
    setImage(null)
    setStyle(null)
    setOutput(null)
    setCategory("All")
    setGenerated('Generate')
    setClickedItem(["",""])
  }
 
 
  const checkFile = (image) => {
    const MAX_image_SIZE = 10485760;
    if (image && image.size <= MAX_image_SIZE) {
    } else {
      alert('Please select a image up to 10MB in size.');
      return false;
    }
    if (image && !image.type.includes('image/')) {
      alert('Please select an image.');
      return false;
    } return true
  }
  const handleImageChange = (e) => {
    const reader = new FileReader()
    const image = e.target.files[0];
    if (image && checkFile(image)){
     
      reader.readAsDataURL(image)
    }
    reader.onload = (readerEvent)=>{
      setImage(readerEvent.target.result)
    }
  }
  const handleImageDrag = (e) => {
    e.preventDefault()
  }
  const handleImageDrop = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const image = e.dataTransfer.files[0];
    if (image && checkFile(image)){
      reader.readAsDataURL(image)
    }
    reader.onload = (readerEvent)=>{
      setImage(readerEvent.target.result)
    }
  }
  const handleImageClick = async(item) => {
    const reader = new FileReader()
    let img = await fetch(item)
    let img_blob = await img.blob()
    reader.readAsDataURL(img_blob)
    reader.onload = (readerEvent)=>{
      setImage(readerEvent.target.result)
    }
  }
 
  const handleStyleClick =async (item) => {
    const reader = new FileReader()
    let img = await fetch(item)
    let img_blob = await img.blob()
    reader.readAsDataURL(img_blob)
    reader.onload = (readerEvent)=>{
      setStyle(readerEvent.target.result)
    }
  }
 
  const handleStyleChange = (e) => {
    const reader = new FileReader()
    const style = e.target.files[0];
    if (style && checkFile(style)){
      reader.readAsDataURL(style)
    }
    reader.onload = (readerEvent)=>{
      setStyle(readerEvent.target.result)
    }
  }
  const handleStyleDrag = (e) => {
    e.preventDefault()
  }
  const handleStyleDrop = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const style = e.dataTransfer.files[0];
    if (style && checkFile(style)){
      reader.readAsDataURL(style)
    }
    reader.onload = (readerEvent)=>{
      setStyle(readerEvent.target.result)
    }
  }
 
  const handleGenerate = async () => {
    if (!image || !style) {
      alert('Please upload both image and style');
      return
    }
    setOutput(null)
    setGenerated("Generating...");
 
    const formData = new FormData()
    formData.append('image', image)
    formData.append('image_to_become', style)
    const url ="/api/image-style-mixer"
    const options={
      method : 'POST',
      body: formData
    }
    try {
      const response = await fetch(url,options )
      let data = await response.json().then(data => {
        if (data.detail || data.error) {
            console.log(data ?? 'Something went wrong');
            return null
        } return  [data.split(",")[0] , image ];
    })
      setOutput(data)
      setGenerated("Regenerate");
    } catch (error) {
      setGenerated("Generate");
      setOutput(null)
      console.error('Error generating:', error);
    }
  }
  return (
   
    <div className="flex">
{/* INPUT */}
      <div className="w-[40vw]   px-5 md:px-14 py-9 bg-black border-r text-white border-[#A1A1A1] h-[calc(100vh-181px)]  overflow-y-auto scrollbar" >
        <div className="flex space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="22" rx="11" stroke="white" strokeOpacity="0.7" strokeWidth="2"/>
            <path d="M13.7528 6.36364V18H11.9915V8.125H11.9233L9.1392 9.94318V8.26136L12.0426 6.36364H13.7528Z" fill="white"/>
            </svg>
            <p >Choose or upload the image of your choice</p>
        </div>
        <div className="mt-6 h-[404px] flex justify-center" onDragOver={handleImageDrag}
              onDrop={handleImageDrop}>
          {!image ? (
            <label
            htmlFor="imageInput"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer"
          >
             <div
              className="flex flex-col items-center justify-center "
             
            >
              <p className="mb-1 text-lg text-[#F2F2F2]">
              Choose a image or drag & drop it here
              </p>
              <p className="text-sm text-white text-opacity-70">
              JPEG, PNG, TIF, and SVG formats, up to 10MB
              </p>
            </div>
            <button onClick = {() => {document.getElementById('imageInput').click()}} className="px-5 py-2 mt-8 border rounded-lg hover:bg-white hover:bg-opacity-20">Browse File</button>
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
          ): (
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
       
        <p className='py-6 text-white'>Or try with one of the samples</p>
 
        <div  className="relative grid grid-cols-3 gap-4 ">
          {imageSamples.slice(0,imgRow*3).map((item, index) => {
            return (
              <div key={index} className='flex justify-center'>
                <img onClick={()=>{handleImageClick(item) ; setClickedItem(p=>[item,p[1]])}} src={item} alt="sample" className={`object-cover w-[136px] h-[136px] rounded-lg cursor-pointer hover:brightness-100  ${clickedItem[0]==item? "border-2" :"brightness-[60%]"}`}/>
              </div>
            )})
          }
          {imageSamples.length>6 &&
          <div className="absolute bottom-0 flex justify-center w-full ">
            <button className="flex items-center px-4 py-2 space-x-3 text-lg text-white rounded-lg hover:bg-white hover:bg-opacity-20 text-opacity-90" onClick={()=>{(imgRow===2) ?  setImgRow(Math.ceil(imageSamples.length/3)):setImgRow(2)
            }}
            ><p>{imgRow===2?"View All":"View Less"}</p>
            <svg className={`${(imgRow!==2 && "rotate-180")} `} width="14" height="9" viewBox="0 0 14 9" fill="none"       xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L7 7.5L13 1.5" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
 
            </button>
          </div>
          }
        </div>
 
        <div className="flex mt-6 space-x-2">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="24" height="24" rx="12" stroke="white" strokeOpacity="0.7" strokeWidth="2"/>
          <path d="M9.21307 19V17.7273L13.1506 13.6477C13.571 13.2045 13.9176 12.8163 14.1903 12.483C14.4669 12.1458 14.6733 11.8258 14.8097 11.5227C14.946 11.2197 15.0142 10.8977 15.0142 10.5568C15.0142 10.1705 14.9233 9.83712 14.7415 9.55682C14.5597 9.27273 14.3116 9.05492 13.9972 8.90341C13.6828 8.74811 13.3286 8.67045 12.9347 8.67045C12.518 8.67045 12.1544 8.75568 11.8438 8.92614C11.5331 9.09659 11.2945 9.33712 11.1278 9.64773C10.9612 9.95833 10.8778 10.322 10.8778 10.7386H9.2017C9.2017 10.0303 9.36458 9.41098 9.69034 8.88068C10.0161 8.35038 10.4631 7.93939 11.0312 7.64773C11.5994 7.35227 12.2453 7.20455 12.9688 7.20455C13.6998 7.20455 14.3438 7.35038 14.9006 7.64205C15.4612 7.92992 15.8987 8.32386 16.2131 8.82386C16.5275 9.32008 16.6847 9.88068 16.6847 10.5057C16.6847 10.9375 16.6032 11.3598 16.4403 11.7727C16.2813 12.1856 16.0028 12.6458 15.6051 13.1534C15.2074 13.6572 14.6544 14.2689 13.946 14.9886L11.6335 17.4091V17.4943H16.8722V19H9.21307Z" fill="white"/>
          </svg>
 
            <p >Choose or upload the style of your choice</p>
        </div>
        <div className="mt-6 h-[404px] flex justify-center" onDragOver={handleStyleDrag}
              onDrop={handleStyleDrop}>
          {!style ? (
            <label
            htmlFor="styleInput"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer"
          >
             <div
              className="flex flex-col items-center justify-center "
             
            >
              <p className="mb-1 text-lg text-[#F2F2F2]">
              Choose a style or drag & drop it here
              </p>
              <p className="text-sm text-white text-opacity-70">
              JPEG, PNG, TIF, and SVG formats, up to 10MB
              </p>
            </div>
            <button onClick = {() => {document.getElementById('styleInput').click()}} className="px-5 py-2 mt-8 border rounded-lg hover:bg-white hover:bg-opacity-20 ">Browse File</button>
            <input
              id="styleInput"
              type="file"
              accept=".jpeg, .jpg, .png, .tif, .tiff, .svg"
              className="hidden"
              onChange={handleStyleChange}
              onDragOver={handleStyleDrag}
              onDrop={handleStyleDrop}
            />
 
          </label>
          ): (
            <div className="relative"> <img
            src={style}
            alt="uploaded"
            className="object-contain h-full rounded-lg "
          />
          <button onClick={(e) => {
              setStyle(null);
              setClickedItem((p) => [p[0],""]);
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
       
        <p className='py-6 text-white'>Or choose a Style</p>
         
          <div className='flex flex-wrap w-full gap-3'>
            {Object.keys(categoryStyles).map((item, index) => {
                return (
                  <button key={index} onClick={()=>setCategory(item)} className={`flex px-5 py-2 space-x-2 border text-white text-opacity-60 border-opacity-60 rounded-3xl hover:bg-white  hover:bg-opacity-20 ${(category===item)?"bg-white bg-opacity-20":""}`}>{item}</button>
            )})}
          </div>
        <div  className="relative grid grid-cols-3 gap-4 mt-6">
          {filteredCategories.slice(0,styleRow*3).map((item, index) => {
              return (
                <div key={index} className='flex justify-center'>
                  <img onClick={()=>{handleStyleClick(item) ;
                    setClickedItem(p=>[p[0],item])}} src={item} alt="sample" className={`object-cover w-[136px] h-[136px] rounded-lg hover:brightness-100 cursor-pointer ${item===clickedItem[1]? "border-2" :"brightness-[60%]"}`}/>
                 
                </div>
              )})
            }
            {filteredCategories.length>6 &&
              <div className="absolute bottom-0 flex justify-center w-full ">
                <button className="flex items-center px-4 py-2 space-x-3 text-lg text-white rounded-lg hover:bg-white hover:bg-opacity-10 text-opacity-90" onClick={()=>{(styleRow===2) ?  setStyleRow(Math.ceil(filteredCategories.length/3)):setStyleRow(2)
                }}
                ><p>{styleRow===2?"View All":"View Less"}</p>
                <svg className={`${(styleRow!==2 && "rotate-180")} `} width="14" height="9" viewBox="0 0 14 9" fill="none"       xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L7 7.5L13 1.5" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
 
                </button>
              </div>
              }
        </div>
 
 
      </div>
     
{/* GENERATE BUTTON */}
        <div className='w-full lg:w-[40%] fixed bottom-0  px-5 md:px-14 py-7 border-t border-r  border-[#A1A1A1] bg-black'>
          <div className='flex justify-center space-x-4 font-semibold'>
            <button onClick={handleGenerate} className='flex space-x-2 py-3 px-10 md:px-24 bg-[#FFC40C] hover:brightness-110 rounded-3xl'>
            <img src="/images/imagestylemixer/generate.png" alt="generate" className="w-6 h-6"/>
            <p>{isGenerated}</p>
            </button>
            <button className='flex space-x-2 py-3 px-5 bg-[#141718] rounded-3xl text-[#A1A1A1]  hover:bg-white hover:bg-opacity-20' onClick={reset}>
              <p>Reset</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 2.5V6.66667H6.66667" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
 
            </button>
          </div>
 
        </div>
 
 
{/* OUTPUT */}
      <div className="bg-[#141718] w-[60vw] h-[calc(100vh-77px)] overflow-y-auto  px-5 md:px-14 py-9  border-r text-white scrollbar">
      <div className='flex flex-col space-y-6'>
        <p>Output</p>
        {output ? (
          <div className='relative w-[504px] h-[504px] bg-[#111111] rounded-lg'>
            <img src={!originalImg ? output[0] : output[1] } alt="output" className="relative object-contain w-full h-full rounded-xl"/>
            <div onClick={()=>setOriginalImg(p=>!p)} className='absolute flex items-center justify-center w-16 h-16 cursor-pointer bg-[#A1A1A1] rounded-xl bottom-6 right-6'>
              <img src = {"/images/imagestylemixer/imgview.png"} alt="view" className={`w-6 h-6 ${!originalImg ?"rotate-180":""}`}/>
              </div>
          </div>
        ) : (isGenerated==="Generating..." )?
          (<div className="flex justify-center items-center w-[504px] h-[504px] bg-[#111111] rounded-lg">
            <dotlottie-player src="https://lottie.host/5f86e9ec-2b81-4f4a-abeb-40bc85633ee8/yUjAkPebZi.json"
            background="transparent" speed="1" style={{width: '300px' ,height: '300px'}} loop autoplay></dotlottie-player>
          </div>) : ( <img src="/images/imagestylemixer/defaultImg.png" alt="output1" className="object-contain w-[504px] h-[504px] rounded-lg"/>)
        }
      </div>
      {output && <OutputButtons output={output[0]} />}
      <div className='mt-10'>
        <h4 className='text-3xl '>Example</h4>
        <img src="/images/imagestylemixer/example (2).png" alt="output1" className='mt-6'/>
      </div>
     
      </div>
   
   
    </div>
 
  )
}
 
export default TestTool
