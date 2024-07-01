import { NextRequest, NextResponse } from "next/server"
 
export async function POST (req:NextRequest){
    const formdata = await req.formData()
    let obj = {};
    formdata.forEach((value, key) => {
         obj[key]=value;
    });
    const url = 'https://coursecreatelipsync.azurewebsites.net/qna'
    try{
        const response = await fetch(url, {
            method : "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error){
        console.error(error)
        return   NextResponse.json({error: error.message})
    }
}