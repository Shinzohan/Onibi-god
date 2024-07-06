"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaPlay } from 'react-icons/fa';
import { SiInstagram, SiReddit, SiYoutube, SiFacebook } from 'react-icons/si';

const Home: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && bgRef.current && buttonRef.current && overlayRef.current && iconsRef.current) {
      const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

      tl.fromTo(
        bgRef.current,
        { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 3.5 }
      );

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        '-=3'
      );

      tl.fromTo(
        textRef.current.querySelectorAll('p, h1, button'),
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        '-=1'
      );

      tl.fromTo(
        iconsRef.current.querySelectorAll('svg'),
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        '-=1'
      );

      // Animation for circles
      gsap.to(".circle", {
        rotate: 360,
        transformOrigin: 'center',
        duration: 5,
        repeat: -1,
        ease: "linear"
      });
    }
  }, []);

  return (
    <motion.div
      className="relative h-screen overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute w-full h-full overflow-hidden z-0">
        <video
          ref={bgRef}
          src="/trial.mp4"
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          preload="auto"
          poster="/Onibisteam.png"
        />
        <div ref={overlayRef} className="absolute w-full h-full bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <div ref={textRef} className="flex flex-col items-center justify-center gap-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to Our Game Studio
            </h1>
            <p className="mt-4 text-xl md:text-2xl">Creating immersive gaming experiences</p>
            <div className="mt-10 flex justify-center items-center relative">
              <div className="relative">
                <Link href="https://www.youtube.com/watch?v=YbkXclwDjSg" target='_blank'>
                <button
                  ref={buttonRef}
                  className="relative z-10 w-[80px] h-[80px] border border-transparent bg-black text-white flex items-center justify-center text-xl font-medium rounded-full  bg-opacity-50 hover:bg-black transition-all duration-300"
                >
                  <FaPlay />
                </button></Link>
                {/* Circle 1 */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-[100px] h-[100px] rounded-full bg-[#41C9E2] bg-opacity-50 circle"></div>
                </motion.div>
                {/* Circle 2 */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-[120px] h-[120px] rounded-full bg-[#41C9E2] bg-opacity-50 circle"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={iconsRef} className="absolute bottom-0 left-10 mb-4 ml-4 flex space-x-4 pb-32 gap-5">
        <SiYoutube className="text-3xl text-white" />
        <SiFacebook className="text-3xl text-white" />
        <SiReddit className="text-3xl text-white" />
        <SiInstagram className="text-3xl text-white" />
      </div>
    </motion.div>
  );
};

export default Home;