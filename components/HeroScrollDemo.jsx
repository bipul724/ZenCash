"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-extrabold leading-tight pb-6 gradient-text">
              Manage Your Finances Effortlessly <br /> with ZenCash
            </h1>
             <h1 className="text-4xl font-semibold text-black dark:text-white">
              Take control of your financial future with our easy-to-use<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                 tools and resources.
              </span>
            </h1>
            
          </div>
        }
      >
        <Image
          src="/image1.png"
          alt="Dashboard preview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl shadow-2xl border object-cover h-full object-left-top"
          priority
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
