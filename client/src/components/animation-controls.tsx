import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Pause } from 'lucide-react';

export default function AnimationControls() {
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);

  const resetAllAnimations = () => {
    // Find all scroll reveal elements and reset them
    const elements = document.querySelectorAll('.scroll-reveal-element');
    elements.forEach((element) => {
      element.classList.remove('scroll-reveal-active');
      // Trigger a brief reset by scrolling to top and back
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        // Retrigger intersection observer by toggling class
        const event = new Event('scroll');
        window.dispatchEvent(event);
      }, 100);
    });
  };

  const toggleAnimations = () => {
    setIsAnimationsEnabled(!isAnimationsEnabled);
    const elements = document.querySelectorAll('.scroll-reveal-element');
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (!isAnimationsEnabled) {
        htmlElement.style.transition = 'none';
      } else {
        htmlElement.style.transition = 'all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.button
        onClick={resetAllAnimations}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          color: 'var(--primary-accent)'
        }}
        title="Reset all animations"
      >
        <RotateCcw size={20} />
      </motion.button>

      <motion.button
        onClick={toggleAnimations}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          color: 'var(--primary-accent)'
        }}
        title={isAnimationsEnabled ? "Pause animations" : "Resume animations"}
      >
        {isAnimationsEnabled ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>

      <motion.div
        className="text-xs text-center px-2 py-1 rounded backdrop-blur-sm border border-white/20"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          color: 'var(--primary-text)'
        }}
      >
        Scroll to animate!
      </motion.div>
    </motion.div>
  );
}