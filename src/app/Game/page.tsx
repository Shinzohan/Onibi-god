'use client';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, Power4 } from 'gsap';
import Card from '@/components/card';
import { projects } from '../data';

const PostCard = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    gsap.fromTo(
      '.title-div',
      { rotation: 0 },
      {
        rotation: 1800,
        duration: 3,
        ease: Power4.easeOut,
        onComplete: () => {
          gsap.to('.title-div', { rotation: 0, duration: 2, ease: 'elastic.out(2, 0.5)' });
        },
      }
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden font-medieval">
      <motion.div
        ref={containerRef}
        className="h-full overflow-y-auto"
        initial={{ y: '-200vh' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1 }}
      >
        {/* Title Section */}
        <div className="title-div h-screen flex flex-col items-center justify-center text-8xl text-center bg-black shadow-2xl rounded-lg border-4 border-purple-900">
           <span className='bg-white text-black border rounded-2xl flex items-center justify-center p-5 mb-5'>CheckOut Our Gameplay</span>
  
           <div className="flex justify-center space-x-4 mt-10">
    {['Onibisteam.png', 'Onibisteam.png', 'Onibisteam.png'].map((src, index) => (
      <div key={index} className="w-48 h-72 rounded-full overflow-hidden relative">
        <Image
          src={`/${src}`}
          alt={`Gameplay ${index + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    ))}
  </div>
</div>
       

        {/* Parallax Cards Section */}
        <div className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default PostCard;