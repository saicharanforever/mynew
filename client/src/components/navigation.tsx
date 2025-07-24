import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'sticky-nav' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="font-playfair text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <span style={{ color: 'var(--primary-accent)' }}>A</span>urelius
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('experiences')}
              className="hover:text-[var(--primary-accent)] transition-colors duration-300 relative group"
            >
              Experiences
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary-accent)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="hover:text-[var(--primary-accent)] transition-colors duration-300 relative group"
            >
              Our Story
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary-accent)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-[var(--primary-accent)] transition-colors duration-300 relative group"
            >
              Gallery
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary-accent)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[var(--primary-accent)] transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary-accent)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Reserve Table
            </button>
            <button className="btn-secondary">Order Online</button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--primary-background)] border-t border-[var(--secondary-background)]"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('experiences')}
                className="block w-full text-left py-2 hover:text-[var(--primary-accent)] transition-colors"
              >
                Experiences
              </button>
              <button
                onClick={() => scrollToSection('story')}
                className="block w-full text-left py-2 hover:text-[var(--primary-accent)] transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left py-2 hover:text-[var(--primary-accent)] transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-2 hover:text-[var(--primary-accent)] transition-colors"
              >
                Contact
              </button>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary w-full"
                >
                  Reserve Table
                </button>
                <button className="btn-secondary w-full">Order Online</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
