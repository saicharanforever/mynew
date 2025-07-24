import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import CircularGallery from '@/components/ui/circular-gallery';

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Elegant Dining" },
  { image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Premium Bar" },
  { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Chef's Art" },
  { image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Intimate Atmosphere" },
  { image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Interior Design" },
  { image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Wine Collection" },
  { image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Culinary Excellence" },
  { image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", text: "Signature Dishes" },
];

export default function GallerySection() {
  const titleRef = useScrollReveal();

  return (
    <section
      id="gallery"
      className="py-20"
      style={{ backgroundColor: 'var(--primary-background)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-16 reveal">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
            Immerse in <span style={{ color: 'var(--primary-accent)' }}>Elegance</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Step into our world where every detail is crafted to create an unforgettable dining experience
          </p>
        </div>

        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery 
            items={galleryItems}
            bend={3} 
            textColor="#D4AF37" 
            borderRadius={0.05} 
            scrollEase={0.02}
            font="bold 24px Playfair Display"
          />
        </div>
      </div>
    </section>
  );
}
