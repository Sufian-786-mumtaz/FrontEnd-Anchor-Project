import {  NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){    
    const token = req.cookies.get("session")
    
    if(req.url.includes("http://localhost:3000/home") && !token){
        return NextResponse.redirect("http://localhost:3000/login")
    }
    if(req.url.includes("http://localhost:3000/cart") && !token){
        return NextResponse.redirect("http://localhost:3000/login")
    }
    if(req.url.includes("http://localhost:3000/success") && !token){
        return NextResponse.redirect("http://localhost:3000/login")
    }
    if(req.url.includes("http://localhost:3000/login") && token){
        return NextResponse.redirect("http://localhost:3000/home")
    }
    if(req.url.includes("http://localhost:3000/signup") && token){
        return NextResponse.redirect("http://localhost:3000/home")
    }
}