import Navigation from '@/components/navigation';
import ScrollProgress from '@/components/scroll-progress';
import AnimationControls from '@/components/animation-controls';
import HeroSection from '@/components/hero-section';
import MenuShowcase from '@/components/menu-showcase';
import StorySection from '@/components/story-section';
import AnimationShowcase from '@/components/animation-showcase';
import GallerySection from '@/components/gallery-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <AnimationControls />
      <Navigation />
      <HeroSection />
      <MenuShowcase />
      <StorySection />
      <AnimationShowcase />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
