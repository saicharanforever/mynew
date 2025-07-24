import { useScrollReveal, AnimationType } from '@/hooks/use-scroll-reveal';

const animationTypes: { type: AnimationType; name: string; description: string }[] = [
  { type: 'fade-up', name: 'Fade Up', description: 'Fades in while sliding up from bottom' },
  { type: 'fade-down', name: 'Fade Down', description: 'Fades in while sliding down from top' },
  { type: 'fade-left', name: 'Fade Left', description: 'Fades in while sliding from right to left' },
  { type: 'fade-right', name: 'Fade Right', description: 'Fades in while sliding from left to right' },
  { type: 'zoom-in', name: 'Zoom In', description: 'Scales up from smaller size with blur effect' },
  { type: 'zoom-out', name: 'Zoom Out', description: 'Scales down from larger size with blur effect' },
  { type: 'slide-up', name: 'Slide Up', description: 'Slides up from bottom without fade' },
  { type: 'slide-down', name: 'Slide Down', description: 'Slides down from top without fade' },
  { type: 'slide-left', name: 'Slide Left', description: 'Slides from right to left without fade' },
  { type: 'slide-right', name: 'Slide Right', description: 'Slides from left to right without fade' },
  { type: 'flip-x', name: 'Flip X', description: 'Rotates around X-axis (horizontal flip)' },
  { type: 'flip-y', name: 'Flip Y', description: 'Rotates around Y-axis (vertical flip)' },
  { type: 'rotate-in', name: 'Rotate In', description: 'Rotates and scales in with spin effect' },
  { type: 'scale-bounce', name: 'Scale Bounce', description: 'Dramatic scale-up with bounce effect' }
];

export default function AnimationShowcase() {
  const titleRef = useScrollReveal({ 
    animation: 'fade-up', 
    duration: 1200, 
    delay: 0 
  });

  return (
    <section 
      className="py-20"
      style={{ backgroundColor: 'hsl(0, 0%, 95%)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 scroll-reveal-element">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-black">
            Scroll <span style={{ color: 'var(--primary-accent)' }}>Animation</span> Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience fully reversible scroll animations. Scroll down to see elements animate in, 
            then scroll back up to watch them animate out and replay as you scroll down again.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animationTypes.map((animation, index) => (
            <AnimationCard 
              key={animation.type} 
              animation={animation} 
              index={index} 
            />
          ))}
        </div>

        <div className="mt-20">
          <TextAnimationExamples />
        </div>
      </div>
    </section>
  );
}

function AnimationCard({ 
  animation, 
  index 
}: { 
  animation: typeof animationTypes[0]; 
  index: number;
}) {
  const cardRef = useScrollReveal({ 
    animation: animation.type,
    duration: 800,
    delay: index * 100,
    reversible: true
  });

  return (
    <div
      ref={cardRef}
      className="scroll-reveal-element bg-white rounded-lg p-6 shadow-lg border"
      style={{ minHeight: '200px' }}
    >
      <div className="flex items-center justify-center mb-4 h-16 rounded-lg"
           style={{ backgroundColor: 'var(--primary-accent)', opacity: 0.1 }}>
        <div 
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: 'var(--primary-accent)' }}
        />
      </div>
      <h3 className="font-playfair text-xl font-semibold mb-2 text-black">
        {animation.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {animation.description}
      </p>
      <div className="mt-4 text-xs font-mono text-gray-400">
        {animation.type}
      </div>
    </div>
  );
}

function TextAnimationExamples() {
  const textElements = [
    { text: "Headlines with Impact", animation: 'fade-up' as AnimationType },
    { text: "Smooth Side Entries", animation: 'slide-left' as AnimationType },
    { text: "Dramatic Zoom Effects", animation: 'zoom-in' as AnimationType },
    { text: "Elegant Flip Transitions", animation: 'flip-x' as AnimationType },
    { text: "Playful Bounce Scaling", animation: 'scale-bounce' as AnimationType }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h3 className="font-playfair text-3xl font-bold mb-4 text-black">
          Text Animation Examples
        </h3>
        <p className="text-gray-600">
          Various text elements demonstrating different animation styles
        </p>
      </div>

      {textElements.map((item, index) => {
        const textRef = useScrollReveal({ 
          animation: item.animation,
          duration: 1000,
          delay: index * 200,
          reversible: true
        });

        return (
          <div 
            key={item.text}
            ref={textRef}
            className="scroll-reveal-element text-center py-8"
          >
            <h4 className="font-playfair text-2xl md:text-3xl font-semibold text-black">
              {item.text}
            </h4>
            <p className="text-sm text-gray-500 mt-2 font-mono">
              Animation: {item.animation}
            </p>
          </div>
        );
      })}
    </div>
  );
}