import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import InteractiveSelector from '@/components/ui/interactive-selector';
import StorySection from '@/components/story-section';
import GallerySection from '@/components/gallery-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <InteractiveSelector />
      <StorySection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
