import React, { useEffect, useRef, useState } from 'react';
import { gsap, Power4 } from 'gsap';

const LaunchingText: React.FC = () => {
  const textElementRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const textVariants = [
      "Check out Onibi's gameplay",
      "Scroll down my friend"
    ];
   
    let currentTextIndex = 0;
    const textElement = textElementRef.current as HTMLSpanElement;

    const animateText = () => {
      const currentText = textVariants[currentTextIndex];
      textElement.innerHTML = "";

      if (isMobile) {
        // Simple fade-in animation for mobile
        textElement.textContent = currentText;
        gsap.fromTo(textElement, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", 
            onComplete: () => {
              gsap.to(textElement, {
                opacity: 0, y: -20, duration: 1, delay: 2, ease: "power2.in",
                onComplete: () => {
                  currentTextIndex = (currentTextIndex + 1) % textVariants.length;
                  animateText();
                }
              });
            }
          }
        );
      } else {
        // Original animation for desktop
        currentText.split('').forEach((letter, index) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.style.opacity = '0';
          textElement.appendChild(span);
          
          const randomX = gsap.utils.random(100, window.innerWidth - 100);
          const randomY = gsap.utils.random(100, window.innerHeight - 100);
          const randomRotation = gsap.utils.random(-360, 360);
          const randomEase = gsap.utils.random(['power1.in', 'power1.out', 'power1.inOut']);
          
          gsap.fromTo(span, 
            { opacity: 0, x: window.innerWidth / 2, y: window.innerHeight / 2, rotation: 0 },
            { opacity: 1, x: randomX, y: randomY, rotation: randomRotation,
              duration: 1.5 + index * 0.1, ease: randomEase,
              onComplete: () => {
                gsap.to(span, {
                  opacity: 0, y: -50, duration: 2, ease: Power4.easeInOut,
                  onComplete: () => {
                    if (index === currentText.length - 1) {
                      currentTextIndex = (currentTextIndex + 1) % textVariants.length;
                      animateText();
                    }
                  }
                });
              }
            }
          );
        });
      }
    };

    animateText();
  }, [isMobile]);

  return (
    <div className="text-container">
      <span ref={textElementRef} className="changing-text"></span>
    </div>
  );
};

export default LaunchingText;