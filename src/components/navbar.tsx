"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./navlinks";
import Button from "./button";
import { FaHome, FaMailBulk, FaGamepad } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { SiDiscord, SiTwitch, SiSteam } from "react-icons/si"; 
import imageLoader from "../../imageLoader";

const links = [
    { url: "/", icon: FaHome },
    { url: "/Game", icon: FaGamepad },
    { url: "/contact", icon: FaMailBulk },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const logoRef = useRef(null); // useRef usage

    useEffect(() => {
        if (logoRef.current) {
            // Setting initial state of the logo
            gsap.set(logoRef.current, {
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            });

            // Creating reveal animation
            gsap.to(logoRef.current, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.5,
                ease: "power2.inOut",
                delay: 0.5,
            });
        }
    }, []);

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
          rotate: 100,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 60,
            damping: 10,
            staggerChildren: 0.1, rotate: 100,
            duration: 5,
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
            <div className="hidden md:flex gap-4 w-1/3">
                {links.map((link, index) => (
                    <NavLink link={link} key={index} />
                ))}
            </div>
            {/* Logo */}
            <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
                <div className="logo-container relative flex items-center">
                    <Link href="/" passHref>
                        <div
                            ref={logoRef}
                            className="relative bg-black text-white rounded-md flex md:right-12 items-center justify-center z-50 xl:right-36"
                        >
                            <Image
                                src={'./Aniflow.svg'}
                                loader={imageLoader}
                                alt="Onibi-logo"
                                height={120}
                                width={120}
                            />
                        </div>
                    </Link>
                </div>
            </div>
            {/* Socials */}
            <div className="hidden md:flex gap-1">
                <Link href="https://discord.gg/vGCjA32myP" target="_blank">
                    <Button
                        icon={SiDiscord}
                        hoverGradient="linear-gradient(to right, #7289DA 100%, transparent 100%)"
                    />
                </Link>
                <Link href="https://www.twitch.tv/aug16th" target="_blank">
                    <Button
                        icon={SiTwitch}
                        hoverGradient="linear-gradient(to right, #815fc1 100%, transparent 100%)"
                    />
                </Link>
                <Link
                    href="https://store.steampowered.com/app/2934090/Onibi/"
                    target="_blank"
                >
                    <Button
                        icon={SiSteam}
                        hoverGradient="linear-gradient(to right, #2a475e  100%, transparent 100%)"
                    />
                </Link>
            </div>
            {/* Responsive Menu */}
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
                {/* Menu List */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            variants={listVariants}
                            initial="closed"
                            animate="opened"
                            className="absolute top-0 left-0 w-screen h-screen bg-white text-white flex flex-col items-center justify-center gap-8 text-4xl"
                            style={{ zIndex: "50" }}
                        >
                            {links.map((link, index) => (
                                <motion.div
                                    variants={listItemVariants}
                                    className=""
                                    key={index}
                                >
                                    <Link href={link.url}>
                                        <link.icon className="text-4xl text-black rotate-[260deg] top-12 relative" />
                                    </Link>
                                </motion.div>
                                
                            ))}
                            <div className="relative rotate-[260deg] flex gap-8 text-black left-32 bottom-24">
                            <Link href="https://discord.gg/vGCjA32myP" target="_blank" >
                                    <SiDiscord />
                                    </Link>
                                    <Link href="https://discord.gg/vGCjA32myP" target="_blank" >
                                    <SiTwitch />
                                    </Link>
                                    <Link href="https://discord.gg/vGCjA32myP" target="_blank" >
                                    <SiSteam />
                                    </Link></div>
                        </motion.div>
                        
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Navbar;
