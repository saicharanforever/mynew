import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import Carousel3D from '@/components/ui/carousel-3d';

const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Restaurant interior
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Tuna tartare
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Beef dish
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Elegant dining
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Bar area
  "https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Pasta dish
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Chef in kitchen
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", // Restaurant design
];

export default function CarouselSection() {
  const titleRef = useScrollReveal();

  return (
    <section
      className="py-20 text-white"
      style={{ backgroundColor: 'var(--primary-background)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-16 reveal">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Experience <span className="kinetic-text">Aurelius</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Move your mouse to explore our culinary world in an immersive 3D gallery
          </p>
        </div>

        <Carousel3D images={restaurantImages} />
      </div>
    </section>
  );
}