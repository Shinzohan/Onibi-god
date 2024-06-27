"use client"

import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="relative h-screen overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 min-w-full min-h-full object-cover"
          poster="/Onibisteam.png"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-center">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-shadow">
              G<span className="text-blue-300">H</span>OST
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-shadow">
              OTAK<span className="text-blue-300">US</span>
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-shadow">
              SAVE
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-shadow">
              THE <span className="text-blue-300">W</span>ORLD
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
