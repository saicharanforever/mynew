import React, { useState, useEffect, useRef } from 'react';

interface Carousel3DProps {
  images: string[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ images }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number | null>(null);

  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate rotation based on mouse movement
    const deltaX = e.clientX - startX;
    // Sensitivity factor to control rotation speed
    const sensitivity = 0.5;
    const newRotation = currentRotation + deltaX * sensitivity;
    setRotation(newRotation);
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse event listeners when component mounts
  useEffect(() => {
    // Only add event listeners when dragging
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // Clean up event listeners when component unmounts or dragging stops
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, currentRotation, rotation]);

  // Add touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentRotation(rotation);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 0.5;
    const newRotation = currentRotation + deltaX * sensitivity;
    setRotation(newRotation);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotate && !isDragging) {
      const autoRotate = () => {
        setRotation(prev => prev + 0.5); // Rotate 0.5 degrees per frame
      };
      
      const intervalId = window.setInterval(autoRotate, 50); // Update every 50ms
      
      // Clear interval on cleanup
      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [isAutoRotate, isDragging]);

  const numImages = images.length;
  // Calculate the angle between each image in the circle
  const anglePerImage = 360 / numImages;

  return (
    <div className="carousel-viewport">
      <div
        className="carousel-container"
        ref={carouselRef}
        style={{
          transform: `rotateY(${rotation % 360}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            className="carousel-image-item"
            key={index}
            style={{
              // Arrange images in a circle using rotateY and push them out with translateZ
              transform: `rotateY(${index * anglePerImage}deg) translateZ(300px)`,
            }}
          >
            <img src={image} alt={`Carousel item ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <style>{`
        /* The viewport sets up the 3D perspective */
        .carousel-viewport {
          width: 100%;
          max-width: 100vw;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px; /* This creates the 3D effect */
          overflow: hidden;
          background: transparent;
          padding: 60px 20px;
          box-sizing: border-box;
        }

        /* The container holds all images and is what actually rotates */
        .carousel-container {
          position: relative;
          width: min(250px, 60vw); /* Responsive width */
          height: 100%;
          transform-style: preserve-3d; /* This is crucial for 3D positioning */
          /* Removed transition to allow for smooth drag rotation */
        }

        /* Styles for each individual image wrapper */
        .carousel-image-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; /* Hides the back of the element when rotated */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Styles for the actual image element */
        .carousel-image-item img {
          width: 100%;
          height: auto;
          border-radius: 16px; /* Rounded corners for the images */
          object-fit: cover;
          user-select: none; /* Prevents image selection on drag */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .carousel-image-item img:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2);
        }
        
        /* Rotate icon styling */
        .rotate-icon {
          margin: 0;
          padding: 0;
          text-align: center;
        }
      `}</style>
      
      {/* Rotate icon */}
      <div className="rotate-icon" style={{ textAlign: 'center', marginTop: '0', paddingTop: '0', fontSize: '24px' }}>
        &#8635; {/* Unicode rotate icon */}
      </div>
    </div>
  );
};

export default Carousel3D;