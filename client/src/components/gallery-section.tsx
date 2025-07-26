import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import CircularGallery from '@/components/ui/circular-gallery';
import SplitText from '@/components/ui/split-text';
import BlurText from '@/components/ui/blur-text';

const galleryItems = [
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_nze533nze533nze5_1_11zon.png?updatedAt=1753542857550", text: "Elegant Dining" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_5bzkos5bzkos5bzk_3_11zon.png?updatedAt=1753542856006", text: "Premium Bar" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_3b0dih3b0dih3b0d_4_11zon.png?updatedAt=1753542850431", text: "Chef's Art" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_1olsxa1olsxa1ols_5_11zon.png?updatedAt=1753542850274", text: "Intimate Atmosphere" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_t7c6vzt7c6vzt7c6_7_11zon.png?updatedAt=1753542849524", text: "Interior Design" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_ktcvc6ktcvc6ktcv_6_11zon.png?updatedAt=1753542831701", text: "Wine Collection" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_mofmxumofmxumofm_8_11zon.png?updatedAt=1753542831023", text: "Culinary Excellence" },
  { image: "https://ik.imagekit.io/vmkmcz5dg/Gemini_Generated_Image_g2beu6g2beu6g2be_2_11zon.png?updatedAt=1753542830732", text: "Signature Dishes" },
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
          <SplitText className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white" delay={0.2} stagger={0.12}>
            Immerse in Elegance
          </SplitText>
          <BlurText className="text-xl text-gray-300 max-w-2xl mx-auto" delay={0.4} stagger={0.04}>
            Step into our world where every detail is crafted to create an unforgettable dining experience
          </BlurText>
        </div>

        <div className="h-[400px] md:h-[600px] relative w-full">
          <CircularGallery 
            items={galleryItems}
            bend={1.5} 
            textColor="#D4AF37" 
            borderRadius={0.05} 
            scrollEase={0.02}
            font="bold 18px Playfair Display"
          />
        </div>
      </div>
    </section>
  );
}
