"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .error-code {
          font-size: clamp(4rem, 15vw, 8rem);
          font-weight: 900;
          background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        }

        .glitch-effect {
          animation: glitch 2s linear infinite;
        }

        .slide-up-1 {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.3s forwards;
        }

        .slide-up-2 {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.6s forwards;
        }

        .slide-up-3 {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.9s forwards;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite, pulse 4s ease-in-out infinite;
        }

        .shape-1 {
          top: 10%;
          left: 10%;
          width: 80px;
          height: 80px;
          background: #ff6b6b;
          border-radius: 50%;
          animation-delay: -1s, -0.5s;
        }

        .shape-2 {
          top: 20%;
          right: 10%;
          width: 60px;
          height: 60px;
          background: #feca57;
          border-radius: 15px;
          animation-delay: -3s, -2s;
        }

        .shape-3 {
          bottom: 15%;
          left: 15%;
          width: 100px;
          height: 40px;
          background: #48dbfb;
          border-radius: 20px;
          animation-delay: -2s, -1.5s;
        }

        .shape-4 {
          bottom: 25%;
          right: 15%;
          width: 70px;
          height: 70px;
          background: #ff9ff3;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation-delay: -4s, -3s;
        }
      `}</style>

      <div className="min-h-screen gradient-bg flex items-center justify-center text-white overflow-hidden relative">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`floating-shape shape-${i}`}
              style={{
                transform: `translate(${mousePosition.x * (i * 10)}px, ${mousePosition.y * (i * 10)}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          ))}
        </div>

        <div className="text-center p-8 max-w-2xl w-full relative z-10">
          <h1 className="error-code glitch-effect mb-4">404</h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 slide-up-1">
            Page Not Found
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed slide-up-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            <br className="hidden sm:block" />
            Don&apos;t worry, let&apos;s get you back on track.
          </p>
          
          <Link href="/" className="slide-up-3">
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center gap-3 px-8 py-4 glassmorphism rounded-full text-white font-semibold text-lg transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 relative overflow-hidden"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-6 h-6"
              >
                <path 
                  d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H9M19 10L21 12M19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H15M9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21M9 21H15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}