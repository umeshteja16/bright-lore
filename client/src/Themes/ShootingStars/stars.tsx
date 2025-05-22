import React from "react";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";

const stars = () => {
  return (
    <div className="absolute inset-0 z-0">
      <StarsBackground />
      <ShootingStars />
    </div>
  );
};

export default stars;
