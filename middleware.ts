import {  NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){    
    const token = req.cookies.get("session")
    
    if(req.url.includes("https://front-end-final-project-xi.vercel.app/home") && !token){
        return NextResponse.redirect("https://front-end-final-project-xi.vercel.app/login")
    }
    if(req.url.includes("https://front-end-final-project-xi.vercel.app/cart") && !token){
        return NextResponse.redirect("https://front-end-final-project-xi.vercel.app/login")
    }
    if(req.url.includes("https://front-end-final-project-xi.vercel.app/success") && !token){
        return NextResponse.redirect("https://front-end-final-project-xi.vercel.app/login")
    }
    if(req.url.includes("https://front-end-final-project-xi.vercel.app/login") && token){
        return NextResponse.redirect("https://front-end-final-project-xi.vercel.app/home")
    }
    if(req.url.includes("https://front-end-final-project-xi.vercel.app/signup") && token){
        return NextResponse.redirect("https://front-end-final-project-xi.vercel.app/home")
    }
}