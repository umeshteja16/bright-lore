import { cn } from "./lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  maxDistance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  minDistance?: number;
  maxDistance?: number;
  maxStars?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const corner = Math.floor(Math.random() * 4); // 0-3 for 4 corners

  switch (corner) {
    case 0: // Top-left to bottom-right
      return { x: -100, y: -100, angle: 45 };
    case 1: // Top-right to bottom-left
      return { x: window.innerWidth + 100, y: -100, angle: 135 };
    case 2: // Bottom-right to top-left
      return {
        x: window.innerWidth + 100,
        y: window.innerHeight + 100,
        angle: 225,
      };
    case 3: // Bottom-left to top-right
      return { x: -100, y: window.innerHeight + 100, angle: 315 };
    default:
      return { x: -100, y: -100, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 2,
  maxSpeed = 4,
  minDelay = 800,
  maxDelay = 1000,
  starColor = "#ffffff",
  trailColor = "#ffffff",
  starWidth = 10,
  starHeight = 1,
  minDistance = 3000,
  maxDistance = 6000,
  maxStars = 2,
  className,
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const starsCountRef = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Function to create a new star
  const createStar = () => {
    // Only create a new star if we're below the limit
    setStars((currentStars) => {
      // Check current count before adding
      if (currentStars.length < maxStars) {
        const { x, y, angle } = getRandomStartPoint();
        const newStar: ShootingStar = {
          id: Date.now(),
          x,
          y,
          angle,
          scale: 1,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          distance: 0,
          maxDistance:
            Math.random() * (maxDistance - minDistance) + minDistance,
        };

        return [...currentStars, newStar];
      }
      return currentStars;
    });

    // Schedule next star creation attempt
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    timeoutRef.current = setTimeout(createStar, randomDelay);
  };

  // Initialize star creation
  useEffect(() => {
    createStar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Animation loop for moving stars
  useEffect(() => {
    const moveStars = () => {
      setStars((prevStars) => {
        const updatedStars = prevStars
          .map((star) => {
            const newX =
              star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY =
              star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;
            const newScale = 1 + newDistance / 2000;

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            };
          })
          .filter((star) => star.distance < star.maxDistance);

        starsCountRef.current = updatedStars.length;
        return updatedStars;
      });

      animationFrameRef.current = requestAnimationFrame(moveStars);
    };

    animationFrameRef.current = requestAnimationFrame(moveStars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Calculate trail length based on star speed
  const getTrailLength = (speed: number) => {
    return Math.max(30, speed * 15);
  };

  // Debug output
  // console.log(`Current stars count: ${stars.length}`);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      <defs>
        {stars.map((star) => (
          <linearGradient
            key={`gradient-${star.id}`}
            id={`gradient-${star.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: trailColor, stopOpacity: 0 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: starColor, stopOpacity: 1 }}
            />
          </linearGradient>
        ))}
      </defs>

      {stars.slice(0, maxStars).map((star) => (
        <rect
          key={star.id}
          x={star.x - getTrailLength(star.speed)}
          y={star.y}
          width={getTrailLength(star.speed) + starWidth * star.scale}
          height={starHeight * (star.scale / 2)}
          fill={`url(#gradient-${star.id})`}
          transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
        />
      ))}
    </svg>
  );
};
