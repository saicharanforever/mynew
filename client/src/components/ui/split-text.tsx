import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: 'words' | 'chars';
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  splitBy = 'words'
}: SplitTextProps) {
  const text = children;
  
  const splitText = splitBy === 'words' 
    ? text.split(' ')
    : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay,
        duration: 0.3
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
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
      y: 20,
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
      {splitText.map((element, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ marginRight: splitBy === 'words' ? '0.25em' : '0' }}
        >
          {element}
          {splitBy === 'words' && index === splitText.length - 1 ? '' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}