import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import Carousel3D from '@/components/ui/carousel-3d';
import SplitText from '@/components/ui/split-text';
import BlurText from '@/components/ui/blur-text';

const restaurantImages = [
  "https://ik.imagekit.io/vmkmcz5dg/8.png?updatedAt=1753542917233", // Restaurant interior
  "https://ik.imagekit.io/vmkmcz5dg/4.png?updatedAt=1753542917244", // Tuna tartare
  "https://ik.imagekit.io/vmkmcz5dg/1.png?updatedAt=1753542916907", // Beef dish
  "https://ik.imagekit.io/vmkmcz5dg/5.png?updatedAt=1753542916646", // Elegant dining
  "https://ik.imagekit.io/vmkmcz5dg/6.png?updatedAt=1753542916396", // Bar area
  "https://ik.imagekit.io/vmkmcz5dg/7.png?updatedAt=1753542916447", // Pasta dish
  "https://ik.imagekit.io/vmkmcz5dg/2.png?updatedAt=1753542916453", // Chef in kitchen
  "https://ik.imagekit.io/vmkmcz5dg/3.png?updatedAt=1753542913432", // Restaurant design
];

export default function CarouselSection() {
  const titleRef = useScrollReveal();

  return (
    <section
      className="py-20 text-white relative"
      style={{ backgroundColor: 'var(--primary-background)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-16 reveal">
          <SplitText className="font-playfair text-4xl md:text-5xl font-bold mb-6" delay={0.2} stagger={0.12}>
            Voices from the Heart
          </SplitText>
          <BlurText className="text-xl text-gray-300 max-w-2xl mx-auto" delay={0.4} stagger={0.04}>
            Real stories. True flavors. Unforgettable memories.
          </BlurText>
        </div>

        <Carousel3D images={restaurantImages} />
      </div>
      
      {/* Black gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}
