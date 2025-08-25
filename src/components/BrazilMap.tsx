import React from 'react';

interface BrazilMapProps {
  className?: string;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ className = "" }) => {
  return (
    <img
      src="/brasil-map.png"
      alt="Mapa do Brasil"
      className={`w-full h-full object-contain ${className}`}
    />
  );
};

export default BrazilMap;