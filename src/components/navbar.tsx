"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "./button";
import NavLink from "./navlinks";
import { motion, AnimatePresence } from "framer-motion"; 

const links = [
  { url: "/", title: "Home" },
  { url: "/Game", title: "Game" },
  { url: "/contact", title: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const topVariants = {
    closed: { rotate: 0 },
    opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
  };

  const centerVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };

  const bottomVariants = {
    closed: { rotate: 0 },
    opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
  };

  const listVariants = {
    closed: { x: "100vw" },
    opened: {
      rotate: 360,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      x: 0,
      transition: {
        when: "beforeChildren",
        type: "spring",
        staggerChildren: 0.2,
        duration: 1,
        ease: "blackInOut",
      },
    },
  };

  const listItemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { rotate: 360, x: 0, opacity: 1 },
  };

  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl text-white bg-black">
      {/* Links */}
      <div className='hidden md:flex gap-4 w-1/3'>
                {links.map((link)=>(
                    <NavLink  link={link} key={link.title}/>
                ))}
            </div>
      {/* logo */}
      <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
      <div className="logo-container relative flex items-center">
        <Link href="/" passHref>
          <motion.div
            className="relative bg-gray-800 text-white p-[50px] rounded-md flex md:right-12 items-center justify-center z-50 h-[100px] xl:right-36"
            style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 30%, 75% 40%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 25% 60%, 0% 30%)" }}
            whileHover={{
              scale: 0.5,
              rotate: 360,
              clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
              transition: { type: "spring", stiffness: 90, duration: 0.1 },
            }}
          >
            <Image
              src="/Aniflow.svg"
              alt="Onibi-logo"
              height={120}
              width={120}
              quality={100}
            />
          </motion.div>
        </Link>
      </div>
    </div>
      {/* socials */}
      <div className="hidden md:flex gap-1">
        <Link href="https://github.com/Shinzohan" target="_blank">
          <Button
            imgSrc="/discordicon.png"
            hoverGradient="linear-gradient(to right, #7289DA 100%, transparent 100%)"
          />
        </Link>
        <Link href="https://www.twitch.tv/aug16th" target="_blank">
          <Button
            imgSrc="/Twitch.png"
            hoverGradient="linear-gradient(to right, #E2BBE9 100%, transparent 100%)"
          />
        </Link>
        <Link
          href="https://store.steampowered.com/app/2934090/Onibi/"
          target="_blank"
        >
          <Button
            imgSrc="/steam-logo.png"
            hoverGradient="linear-gradient(to right, #2a475e  100%, transparent 100%)"
          />
        </Link>
      </div>
      {/* responsive menu */}
      <div className="md:hidden">
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen(!open)}
          style={{ zIndex: "60" }}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded origin-left"
          ></motion.div>
        </button>
        {/* menu list */}
        <AnimatePresence>
          {open && (
             <motion.div
             variants={listVariants}
             initial="closed"
             animate="opened"
             className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl"
             style={{ zIndex: "50" }}
           >
             {links.map((link) => (
               <motion.div
                 variants={listItemVariants}
                 className=""
                 key={link.title}
               >
                 <Link href={link.url}>{link.title}</Link>
               </motion.div>
             ))}
           </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
