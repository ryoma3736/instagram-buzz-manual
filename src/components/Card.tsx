import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <div className="text-gray-300">{children}</div>
  </div>
);

export default Card;

