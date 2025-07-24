import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const StickyScroll = () => {
  const titleRef = useScrollReveal();

  return (
    <section className='w-full bg-black py-20 overflow-hidden'>
      {/* Header Section */}
      <div className="text-center mb-16 px-6">
        <motion.h1
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-white reveal"
        >
          Visual <span className="kinetic-text">Gallery</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl mb-8 font-light text-gray-300 max-w-2xl mx-auto"
        >
          Immerse yourself in the artistry of fine dining
        </motion.p>
      </div>

      {/* Sticky Gallery */}
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
          {/* Left Column - Scrolling Images */}
          <div className='md:col-span-4 grid gap-4'>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Exquisite dish presentation'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Premium beef preparation'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Artisanal pasta creation'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Chef in action'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Elegant dining ambiance'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
          </div>

          {/* Center Column - Sticky Images */}
          <div className='md:col-span-4 hidden md:block'>
            <div className='sticky top-20 grid grid-rows-3 gap-4 h-screen'>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  alt='Restaurant interior elegance'
                  className='transition-all duration-300 h-full w-full object-cover rounded-lg'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  alt='Premium bar experience'
                  className='transition-all duration-300 h-full w-full object-cover rounded-lg'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  alt='Sophisticated design details'
                  className='transition-all duration-300 h-full w-full object-cover rounded-lg'
                />
              </figure>
            </div>
          </div>

          {/* Right Column - Scrolling Images */}
          <div className='md:col-span-4 grid gap-4'>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Wine selection expertise'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Farm-fresh ingredients'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Gourmet pizza artistry'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Dessert perfection'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
            <figure className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='Culinary presentation mastery'
                className='transition-all duration-300 w-full h-96 object-cover rounded-lg hover:scale-105'
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyScroll;