import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function BlurText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.03
}: BlurTextProps) {
  const text = children;
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay 
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    },
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}