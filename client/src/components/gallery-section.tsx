import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Elegant dining room",
    span: "col-span-1 row-span-1"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
    alt: "Premium bar area",
    span: "col-span-1 row-span-2"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Chef plating dish",
    span: "col-span-1 row-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Intimate dining atmosphere",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Restaurant interior design",
    span: "col-span-1 row-span-1"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Wine cellar",
    span: "col-span-1 row-span-1"
  }
];

export default function GallerySection() {
  const titleRef = useScrollReveal();

  return (
    <section
      id="gallery"
      className="py-20"
      style={{ backgroundColor: 'hsl(0, 0%, 97%)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 reveal">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-black">
            Immerse in <span style={{ color: 'var(--primary-accent)' }}>Elegance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step into our world where every detail is crafted to create an unforgettable dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryImage({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  const imageRef = useScrollReveal();

  return (
    <motion.div
      ref={imageRef}
      className={`reveal overflow-hidden rounded-lg shadow-lg group ${
        index === 1 ? 'lg:row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </motion.div>
  );
}
