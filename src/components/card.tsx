'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

type CardProps = {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
};

const Card = ({ i, title, description, src, url, color, progress, range, targetScale }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useTransform(progress, range, [0, -100]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{ y, scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative flex flex-col w-[1000px] h-[500px] p-8 transform-origin-top rounded-2xl shadow-2xl bg-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }}></div>
        <h2 className="text-3xl font-bold text-center mb-6 relative z-10 text-black">{title}</h2>
        <div className="flex h-full gap-8 relative z-10">
          <div className="w-[40%] flex flex-col justify-between">
            <p className="text-lg leading-relaxed text-black">
              <span className="text-3xl font-semibold">{description.charAt(0)}</span>
              {description.slice(1)}
            </p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium transition-transform hover:scale-105"
            >
              See more
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="w-[60%] rounded-xl overflow-hidden shadow-lg">
            <motion.div className="w-full h-full">
              <video
                className="object-cover w-full h-full"
                src={`/video/${src}`}
                controls
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;