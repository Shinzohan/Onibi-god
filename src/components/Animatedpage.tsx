"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

interface AnimatedPageProps {
    children: ReactNode;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
    const pathName = usePathname();

    const blockVariants = {
        initial: { scaleY: 1 },
        animate: { scaleY: 0, height: "200vh" },
        exit: { scaleY: 1 }
    };

    const blockTransition = { duration: 0.6, ease: "easeInOut" };

    return (
        <AnimatePresence mode="wait">
            <div key={pathName} className="w-screen h-screen bg-black overflow-hidden relative z-10">
                
                {/* Animated Blocks */}
                <div className="absolute inset-0 flex z-40 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="h-full bg-[#D77FA1]"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={blockVariants}
                            transition={{ ...blockTransition, delay: i * 0.05 }}
                            style={{ 
                                width: "10.1%", 
                                backfaceVisibility: "hidden", 
                                transform: "translate3d(0, 0, 0)",
                                willChange: "transform, opacity",
                                marginLeft: i === 0 ? "0" : "-1px" 
                            }}
                        />
                    ))}
                </div>

                {/* Text Animation */}
                <motion.div
                    className="fixed m-auto top-0 bottom-0 left-0 right-0 text-black text-8xl cursor-default z-50 pointer-events-none w-fit h-fit"
                    initial={{ opacity: 1, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ 
                        backfaceVisibility: "hidden", 
                        transform: "translate3d(0, 0, 0) scale(1.0001)",
                        willChange: "transform, opacity"
                    }}
                >
                    {pathName.substring(1)}
                </motion.div>

                {/* Main Content */}
                <div className="relative z-30">
                    <div className="h-24">
                        <Navbar />
                    </div>

                    <motion.div
                        className="h-[calc(100vh-6rem)] z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{ 
                            backfaceVisibility: "hidden", 
                            transform: "translate3d(0, 0, 0) scale(1.0001)",
                            willChange: "transform, opacity"
                        }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}

export default AnimatedPage;
