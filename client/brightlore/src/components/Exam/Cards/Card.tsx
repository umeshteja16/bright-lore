import React from "react";
import { useNavigate } from "react-router-dom";
import { PaperProps } from "../../types/types";

const Card: React.FC<PaperProps> = ({ title, image, year }) => {
  const navigate = useNavigate();
  return (
    <div
      className="text-white flex-col"
      onClick={() => {
        navigate("/paper");
      }}
    >
      <img src={image} className="h-50" />
      <h1>{title}</h1>
    </div>
  );
};

export default Card;
