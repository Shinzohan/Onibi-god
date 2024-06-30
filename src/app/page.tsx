"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { FaPlay } from 'react-icons/fa'; 

const Home: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && bgRef.current) {
      const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

      tl.fromTo(
        bgRef.current,
        { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 3.5 }
      );

      tl.fromTo(
        textRef.current.querySelectorAll('p'),
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        '-=1'
      );
    }
  }, []);

  return (
    <motion.div
      className="relative h-screen overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <div ref={bgRef} className="absolute w-full h-full overflow-hidden z-0">
        <Image
          src={"/onibisteam.png"}
          alt="Background Image"
          fill
          objectFit="cover"
        />
        <div className="absolute w-full h-full bg-black bg-opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-center">
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-4xl font-bold leading-tight text-shadow">
            Dash, possess, and explore your way 
            </h1>
            <p className="text-6xl md:text-4xl  leading-tight text-shadow">
            through different areas as you accompany a child on their adventures 
            </p>
            <p className="text-6xl md:text-4xl  leading-tight text-shadow">
            as their fledgling guardian spirit
            </p>
          </div>
          {/* BUTTON */}
          <button className="relative mt-10 px-6 py-3 border border-white text-white flex items-center justify-center text-xl font-medium rounded-sm bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-300">
            <FaPlay className="" /> 
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;