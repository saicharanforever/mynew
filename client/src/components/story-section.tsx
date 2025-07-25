import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import SplitText from '@/components/ui/split-text';

export default function StorySection() {
  const imageRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section
      id="story"
      className="py-20 text-white"
      style={{ backgroundColor: 'var(--primary-background)' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="reveal">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
              alt="Chef Marcus Aurelius in kitchen"
              className="w-full h-96 lg:h-full object-cover rounded-lg"
            />
          </div>

          <div ref={contentRef} className="reveal">
            <SplitText className="font-playfair text-4xl md:text-5xl font-bold mb-8" delay={0.2} stagger={0.15}>
              Our Philosophy
            </SplitText>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-6 leading-relaxed"
            >
              At Aurelius, we believe that dining is not merely about sustenance—it is about creating moments that transcend the ordinary and elevate the soul.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg mb-6 text-gray-300 leading-relaxed"
            >
              Founded by Chef Marcus Aurelius, our restaurant combines time-honored techniques with innovative approaches, sourcing only the finest ingredients from local artisans and sustainable producers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg mb-8 text-gray-300 leading-relaxed"
            >
              Every dish tells a story, every flavor carries intention, and every meal becomes a cherished memory.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 mb-8"
            >
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  15+
                </div>
                <div className="text-sm text-gray-400">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  3
                </div>
                <div className="text-sm text-gray-400">Michelin Stars</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  50K+
                </div>
                <div className="text-sm text-gray-400">Happy Guests</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  100%
                </div>
                <div className="text-sm text-gray-400">Local Sourced</div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="btn-secondary text-lg"
            >
              Meet the Chef
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
