"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, Variants } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import './globals.css';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    controls.start('visible');
  }, [controls, isMobile]);

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1,
        ease: 'easeInOut' 
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: isMobile ? 0 : 3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const bgVariants: Variants = {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    visible: {
      clipPath: 'circle(75% at 50% 50%)',
      transition: { duration: 3.5 }
    }
  };

  const circleVariants = {
    animate1: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: {
        rotate: {
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    animate2: {
      rotate: -360,
      scale: [1, 0.9, 1],
      transition: {
        rotate: {
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
  };

  return (
    <motion.div
      className="relative h-screen overflow-hidden font-Mystery"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute w-full h-full overflow-hidden z-0">
        <motion.video
          src="/Background.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          preload="auto"
          poster="/Onibisteam.png"
          variants={bgVariants}
          initial="hidden"
          animate={isMobile ? "visible" : controls}
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <motion.div 
          className="flex flex-col items-center justify-center gap-8"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center text-white">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold leading-tight font-medieval">
              Welcome to Our Game Studio
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 text-xl md:text-2xl font-medieval">
              Creating immersive gaming experiences
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 flex justify-center items-center relative">
              <div className="relative">
                <Link href="https://www.youtube.com/watch?v=YbkXclwDjSg" target='_blank'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-[80px] h-[80px] border border-transparent bg-black text-white flex items-center justify-center text-xl font-medium rounded-full bg-opacity-50 hover:bg-black transition-all duration-300"
                  >
                    <FaPlay />
                  </motion.button>
                </Link>
                {!isMobile && (
                  <>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      variants={circleVariants}
                      animate="animate1"
                    >
                      <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-blue-200 to-blue-600 opacity-50"></div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      variants={circleVariants}
                      animate="animate2"
                    >
                      <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-r from-blue-300 to-blue-500 opacity-50"></div>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 xl:left-10 mb-4 flex pb-[100px] gap-5 sm:left-1 ml-4">
        <Image 
          src='/Onibichan.svg'
          alt='onibilogo'
          width={100}
          height={100}
          priority
        />
      </div>
    </motion.div>
  );
};

export default Home;