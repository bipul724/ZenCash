"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {


    const imageRef = useRef(null);

    useEffect(()=>{
      const imageElement = imageRef.current;
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;

        if(scrollPosition>scrollThreshold){
          imageElement.classList.add("scrolled");
        }
        else{
          imageElement.classList.remove("scrolled");
        }
      }
      window.addEventListener("scroll",handleScroll);

      return ()=> window.removeEventListener("scroll",handleScroll);
    },[]);



  return (
    <div>
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-[90px] font-extrabold leading-tight pb-6 gradient-text">
            Manage Your Finances Effortlessly <br /> with ZenCash
        </h1>


        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take control of your financial future with our easy-to-use tools and resources.
        </p>
        <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
             <Button size="lg" className="px-8">
                Get Started
             </Button>
            </Link>
        </div>
        <div className="hero-image-wrapper ">
            <div ref={imageRef} className="hero-image">
                <Image 
                    src="/image.png"
                    alt="Dashboard preview"
                    width={1280}
                    height={720}
                    className="rounded-lg shadow-2xl border mx-auto"
                    priority

                />
            </div>
        </div>
      </div>
    </div>

    
  )
}

export default HeroSection
