import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Pan-Seared Halibut",
    description: "With truffle risotto, seasonal vegetables, and champagne reduction",
    price: 48,
    image: "https://images.unsplash.com/photo-1559847844-d72f8b88e72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 2,
    name: "Beef Tenderloin",
    description: "Dry-aged premium cut with roasted garlic purée and red wine jus",
    price: 62,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 3,
    name: "Chocolate Soufflé",
    description: "Valrhona dark chocolate with vanilla bean ice cream and gold leaf",
    price: 18,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 4,
    name: "Tuna Tartare",
    description: "Yellowfin tuna with avocado mousse, citrus pearls, and sesame crisp",
    price: 24,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 5,
    name: "Lobster Ravioli",
    description: "House-made pasta filled with Maine lobster in saffron cream sauce",
    price: 38,
    image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 6,
    name: "Garden Symphony",
    description: "Seasonal vegetables with quinoa, herb oil, and pomegranate pearls",
    price: 32,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

export default function MenuShowcase() {
  const titleRef = useScrollReveal();

  return (
    <section
      id="menu"
      className="py-20"
      style={{ backgroundColor: 'hsl(0, 0%, 97%)' }}
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 reveal">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-black">
            Signature <span style={{ color: 'var(--primary-accent)' }}>Creations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each dish is a masterpiece, crafted with the finest ingredients and presented with artistic precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <MenuButton />
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const cardRef = useScrollReveal();

  return (
    <motion.div
      ref={cardRef}
      className="reveal bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ 
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
      onHoverStart={() => {
        const card = document.querySelector(`[data-menu-card="${item.id}"]`) as HTMLElement;
        if (card) {
          card.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.15)';
        }
      }}
      onHoverEnd={() => {
        const card = document.querySelector(`[data-menu-card="${item.id}"]`) as HTMLElement;
        if (card) {
          card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
      }}
      data-menu-card={item.id}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="p-6">
        <h3 className="font-playfair text-2xl font-semibold mb-2 text-black">
          {item.name}
        </h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span
            className="font-semibold text-xl"
            style={{ color: 'var(--primary-accent)' }}
          >
            ${item.price}
          </span>
          <button
            className="hover:scale-110 transition-transform duration-200"
            style={{ color: 'var(--primary-accent)' }}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MenuButton() {
  const buttonRef = useScrollReveal();

  return (
    <div ref={buttonRef} className="reveal">
      <button
        className="text-lg font-medium hover:scale-105 transition-all duration-300"
        style={{
          backgroundColor: 'var(--primary-accent)',
          color: 'var(--primary-background)',
          padding: '12px 32px',
          borderRadius: '4px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        View Complete Menu
      </button>
    </div>
  );
}
