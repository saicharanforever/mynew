import React, { useState, useEffect, useRef } from 'react';

interface Carousel3DProps {
  images: string[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ images }) => {
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // This function handles the mouse movement and updates the rotation
  const handleMouseMove = (e: MouseEvent) => {
    // Calculate the horizontal position of the mouse from -1 (left) to 1 (right)
    const normalizedPosition = (e.clientX / window.innerWidth) * 2 - 1;
    // Define the maximum rotation angle (e.g., 25 degrees in either direction)
    const maxRotation = 25;
    const newRotation = normalizedPosition * maxRotation;
    setRotation(newRotation);
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const numImages = images.length;
  // Calculate the angle between each image in the circle
  const anglePerImage = 360 / numImages;

  return (
    <div className="carousel-viewport">
      <div
        className="carousel-container"
        ref={carouselRef}
        style={{
          transform: `rotateY(${rotation}deg)`,
        }}
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
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px; /* This creates the 3D effect */
          overflow: hidden;
          background: transparent;
          padding: 60px 0;
        }

        /* The container holds all images and is what actually rotates */
        .carousel-container {
          position: relative;
          width: 250px; /* Adjust width as needed */
          height: 100%;
          transform-style: preserve-3d; /* This is crucial for 3D positioning */
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smooth rotation */
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
      `}</style>
    </div>
  );
};

export default Carousel3D;