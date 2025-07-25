import { ReactLenis } from 'lenis/react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import InteractiveSelector from '@/components/ui/interactive-selector';
import CompactSelector from '@/components/ui/compact-selector';
import StorySection from '@/components/story-section';
import GallerySection from '@/components/gallery-section';
import ContactSection from '@/components/contact-section';
import CarouselSection from '@/components/carousel-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Navigation />
          <HeroSection />
          <InteractiveSelector />
          <CompactSelector />
          <StorySection />
          <GallerySection />
          <CarouselSection />
          <ContactSection />
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
}
