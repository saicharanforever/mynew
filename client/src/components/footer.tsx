import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Hyperspeed from '@/components/ui/hyperspeed';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="py-12 text-white sticky bottom-0 z-10 relative overflow-hidden"
      style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}
    >
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 w-full h-full">
        <Hyperspeed effectOptions={{
          distortion: 'turbulentDistortion',
          length: 300,
          roadWidth: 8,
          islandWidth: 1,
          lanesPerRoad: 2,
          fov: 120,
          speedUp: 1.5,
          carLightsFade: 0.6,
          totalSideLightSticks: 15,
          lightPairsPerRoadWay: 25,
          colors: {
            roadColor: 0x0a0a0a,
            islandColor: 0x080808,
            background: 0x000000,
            shoulderLines: 0x222222,
            brokenLines: 0x333333,
            leftCars: [0x8B4513, 0xCD853F, 0xDAA520], // Gold tones
            rightCars: [0x191970, 0x4169E1, 0x6495ED], // Blue tones
            sticks: 0xCD853F,
          }
        }} />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 bg-black bg-opacity-40 rounded-lg p-6 backdrop-blur-sm">
          <div>
            <div className="font-playfair text-2xl font-bold mb-4">
              <span style={{ color: 'var(--primary-accent)' }}>A</span>urelius
            </div>
            <p className="text-gray-400 mb-4">
              Where culinary artistry meets exceptional service in an atmosphere of refined elegance.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
            </div>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection('experiences')}
                  className="hover:text-[var(--primary-accent)] transition-colors"
                >
                  Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('story')}
                  className="hover:text-[var(--primary-accent)] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-[var(--primary-accent)] transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-[var(--primary-accent)] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[var(--primary-accent)] transition-colors">Private Dining</a></li>
              <li><a href="#" className="hover:text-[var(--primary-accent)] transition-colors">Wine Pairings</a></li>
              <li><a href="#" className="hover:text-[var(--primary-accent)] transition-colors">Chef's Table</a></li>
              <li><a href="#" className="hover:text-[var(--primary-accent)] transition-colors">Catering</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <div>123 Culinary Avenue</div>
              <div>New York, NY 10021</div>
              <div>+1 (555) 123-DINE</div>
              <div>reservations@aurelius-restaurant.com</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300 bg-black bg-opacity-30 rounded-lg backdrop-blur-sm">
          <p>&copy; 2024 Aurelius Restaurant. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="transition-colors duration-300"
      style={{ color: 'var(--primary-accent)' }}
    >
      {icon}
    </motion.a>
  );
}
