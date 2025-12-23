import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Link from "next/link";
// import HeroSection from "@/components/hero";

import Header from "@/components/navbar";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import StatsSection from "@/components/StatsSection";
import { AnimatedTestimonialsDemo } from "@/components/Testimonials";
import { GridBackgroundDemo } from "@/components/GridBackgroundDemo";


export default function Home() {



  return (
    <div className="mt-20">
      {/* Grid Background Section */}

      <HeroScrollDemo />

      {/* Stats Section */}

      <StatsSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:50px_50px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full mb-6">
              <span className="text-blue-600 font-medium">✨ Core Features</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Everything you need to manage your finances
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools and intelligent insights designed to simplify your financial journey and help you achieve your goals faster.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:border-blue-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <CardContent className="relative z-10 space-y-6 pt-4">
                  {/* Enhanced icon container */}
                  <div className="relative">
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white text-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {feature.icon}
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Interactive explore button */}
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
                      Explore feature
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/80 transition-all duration-700 rounded-b-2xl"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom call-to-action */}

        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started with our simple 3-step process and transform your financial management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Desktop connecting lines */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

            {howItWorksData.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:border-blue-300 group"
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                  role="article"
                  aria-labelledby={`step-${index + 1}-title`}
                >
                  {/* Step number and icon container */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full flex items-center justify-center font-bold shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>

                    {/* Icon container */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl shadow-lg border border-gray-100 group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-300 group-hover:rotate-3">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3
                      id={`step-${index + 1}-title`}
                      className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/100 transition-all duration-500 rounded-b-2xl"></div>
                </div>

                {/* Mobile connecting arrow */}
                {index < howItWorksData.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-transparent relative">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-blue-400"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
    text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 
    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <AnimatedTestimonialsDemo />

        </div>
      </section>



      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center max-w-3xl mx-auto border border-gray-200 transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] hover:border-blue-300 group relative overflow-hidden">

            {/* Animated glow overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-cyan-100/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Corner accent lights */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Content - relative positioning for z-index */}
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto group-hover:text-gray-700 transition-colors duration-300">
                Join thousands of users who are already managing their finances
                smarter with <span className="text-blue-600 font-semibold group-hover:text-purple-600 transition-colors duration-300">ZenCash</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform hover:scale-105">
                  Start Free Trial
                </button>
                <span className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300">or</span>
                <button className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-xl hover:scale-105 transform bg-white/50">
                  View All Features
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-6 group-hover:text-gray-600 transition-colors duration-300">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/20 transition-all duration-700 pointer-events-none"></div>

            {/* Subtle floating particles */}
            <div className="absolute top-4 right-8 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-8 left-12 w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-500" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-12 left-8 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-500" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </section>
    </div>
  )
}
