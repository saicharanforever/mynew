import { useEffect, useRef } from 'react';

export type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right'
  | 'flip-x'
  | 'flip-y'
  | 'rotate-in'
  | 'scale-bounce';

export interface ScrollRevealOptions {
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  reversible?: boolean;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    animation = 'fade-up',
    duration = 800,
    delay = 0,
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    reversible = true,
    triggerOnce = false
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Apply initial animation state
    element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    element.style.transitionDelay = `${delay}ms`;
    applyAnimationState(element, animation, false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          
          if (entry.isIntersecting) {
            // Element is entering viewport - animate in
            applyAnimationState(target, animation, true);
            target.classList.add('scroll-reveal-active');
            
            if (triggerOnce) {
              observer.unobserve(target);
            }
          } else if (reversible && !triggerOnce) {
            // Element is leaving viewport - animate out
            applyAnimationState(target, animation, false);
            target.classList.remove('scroll-reveal-active');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animation, duration, delay, threshold, rootMargin, reversible, triggerOnce]);

  return elementRef;
}

function applyAnimationState(element: HTMLElement, animation: AnimationType, isVisible: boolean) {
  if (isVisible) {
    // Animate in - final state
    element.style.opacity = '1';
    element.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    element.style.filter = 'blur(0px)';
  } else {
    // Animate out - initial state
    element.style.opacity = getInitialOpacity(animation);
    element.style.transform = getInitialTransform(animation);
    element.style.filter = getInitialFilter(animation);
  }
}

function getInitialOpacity(animation: AnimationType): string {
  const fadeAnimations = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out'];
  return fadeAnimations.includes(animation) ? '0' : '1';
}

function getInitialTransform(animation: AnimationType): string {
  switch (animation) {
    case 'fade-up':
    case 'slide-up':
      return 'translate3d(0, 50px, 0)';
    case 'fade-down':
    case 'slide-down':
      return 'translate3d(0, -50px, 0)';
    case 'fade-left':
    case 'slide-left':
      return 'translate3d(50px, 0, 0)';
    case 'fade-right':
    case 'slide-right':
      return 'translate3d(-50px, 0, 0)';
    case 'zoom-in':
      return 'scale(0.8)';
    case 'zoom-out':
      return 'scale(1.2)';
    case 'flip-x':
      return 'rotateX(90deg)';
    case 'flip-y':
      return 'rotateY(90deg)';
    case 'rotate-in':
      return 'rotate(-180deg) scale(0.8)';
    case 'scale-bounce':
      return 'scale(0.3)';
    default:
      return 'translate3d(0, 50px, 0)';
  }
}

function getInitialFilter(animation: AnimationType): string {
  const blurAnimations = ['zoom-in', 'zoom-out'];
  return blurAnimations.includes(animation) ? 'blur(5px)' : 'blur(0px)';
}
