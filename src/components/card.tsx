'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

type CardProps = {
  i: number;
  title: string;
  description: string;
  src: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
};

const Card = ({ i, title, description, src, progress, range, targetScale }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useTransform(progress, range, [0, -100]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{ y, scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative flex flex-col w-[1000px] h-[500px] p-8 transform-origin-top rounded-2xl shadow-2xl bg-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10" ></div>
        <h2 className="text-3xl font-bold text-center mb-6 relative z-10 text-black">{title}</h2>
        <div className="flex h-full gap-8 relative z-10">
          <div className="w-[40%] flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-black">
              <span className="text-4xl font-semibold">{description.charAt(0)}</span>
              {description.slice(1)}
            </p>
           
          </div>
          <div className="w-[70%] rounded-3xl overflow-hidden shadow-lg">
            <motion.div className="w-full h-full">
              <video
                className="object-cover w-full h-full"
                src={`/video/${src}`}
                autoPlay
                muted  
                loop
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
