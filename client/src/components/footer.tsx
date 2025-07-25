import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="py-12 text-white fixed bottom-0 left-0 right-0 z-0"
      style={{ backgroundColor: 'hsl(0, 0%, 20%)' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
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

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
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
