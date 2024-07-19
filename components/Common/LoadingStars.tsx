"use client"

import { useEffect, useState } from 'react';

const colors = ['#ff6347', '#ffa07a', '#ff4500', '#ff1493', '#ff69b4'];

const generateRandomPosition = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
});

const generateStars = (numStars) => {
  return Array.from({ length: numStars }, (_, index) => ({
    id: index,
    color: colors[Math.floor(Math.random() * colors.length)],
    position: generateRandomPosition(),
  }));
};

const LoadingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(300)); // Generate 100 stars
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
      <div className="relative w-full h-full overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: star.color,
              top: star.position.top,
              left: star.position.left,
              transform: 'translate(-50%, -50%)',
              animation: `twinkle 1.5s infinite, move ${Math.random() * 3 + 2}s linear infinite`
            }}
          />
        ))}
      </div>
      <p className="absolute text-lg">Shining Stars Loading...</p>
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        @keyframes move {
          0% { transform: translate(-50%, -50%) translateX(0) translateY(0); }
          100% { transform: translate(-50%, -50%) translateX(calc(100vw - 50%)) translateY(calc(100vh - 50%)); }
        }
      `}</style>
    </div>
  );
};

export default LoadingStars;
