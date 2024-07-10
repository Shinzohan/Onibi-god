import { useEffect, useRef } from 'react';
import { gsap, Power4 } from 'gsap';
const LaunchingText: React.FC = () => {
  const textElementRef = useRef<HTMLSpanElement>(null);
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
      currentText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        textElement.appendChild(span);
        const randomX = gsap.utils.random(100, window.innerWidth - 100);
        const randomY = gsap.utils.random(100, window.innerHeight - 100);
        const randomRotation = gsap.utils.random(-360, 360);
        const randomEase = gsap.utils.random(['power1.in', 'power1.out', 'power1.inOut']);
        gsap.fromTo(span, {
          opacity: 0,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          rotation: 0,
        }, {
          opacity: 1,
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          duration: 1.5 + index * 0.1,
          ease: randomEase,
          onComplete: () => {
            gsap.to(span, {
              opacity: 0,
              y: -50,
              duration: 2,
              ease: Power4.easeInOut,
              onComplete: () => {
                if (index === currentText.length - 1) {
                  currentTextIndex = (currentTextIndex + 1) % textVariants.length;
                  animateText();
                }
              }
            });
          }
        });
      });
    };
    animateText();
  }, []);
  return (
    <div className="text-container">
      <span ref={textElementRef} className="changing-text"></span>
    </div>
  );
};
export default LaunchingText;