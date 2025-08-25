import React from "react";

// Advanced light effects overlay for premium hero section
// Features: animated light rays, subtle lens flares, and dynamic gradients
const HeroLightEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary light ray */}
        <div 
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-sanders-blue-glow/20 via-sanders-blue/10 to-transparent transform rotate-12 animate-pulse"
          style={{animationDuration: '6s'}}
        />
        
        {/* Secondary light ray */}
        <div 
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-sanders-ocean/15 via-sanders-blue/8 to-transparent transform -rotate-6 animate-pulse"
          style={{animationDuration: '8s', animationDelay: '2s'}}
        />
        
        {/* Tertiary light ray */}
        <div 
          className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-sanders-blue/12 via-sanders-blue-glow/6 to-transparent transform rotate-3 animate-pulse"
          style={{animationDuration: '10s', animationDelay: '4s'}}
        />
      </div>
      
      {/* Lens flare effects */}
      <div className="absolute inset-0">
        {/* Main lens flare */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-radial from-sanders-blue-glow/15 via-sanders-blue/8 to-transparent rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}} />
        
        {/* Secondary lens flare */}
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-radial from-sanders-ocean/12 via-sanders-blue/6 to-transparent rounded-full blur-lg animate-pulse" style={{animationDuration: '5s', animationDelay: '1.5s'}} />
        
        {/* Tertiary lens flare */}
        <div className="absolute top-2/3 right-1/5 w-16 h-16 bg-gradient-radial from-sanders-blue/10 via-sanders-blue-glow/5 to-transparent rounded-full blur-md animate-pulse" style={{animationDuration: '7s', animationDelay: '3s'}} />
      </div>
      
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sanders-blue/3 via-transparent to-sanders-ocean/2 animate-pulse" style={{animationDuration: '12s'}} />
        <div className="absolute inset-0 bg-gradient-to-tl from-sanders-blue-glow/2 via-transparent to-sanders-blue/3 animate-pulse" style={{animationDuration: '15s', animationDelay: '6s'}} />
      </div>
      
      {/* Floating light particles */}
      <div className="absolute inset-0">
        {/* Particle 1 */}
        <div 
          className="absolute top-1/5 left-1/6 w-2 h-2 bg-sanders-blue-glow rounded-full blur-sm animate-float opacity-60"
          style={{animationDuration: '12s', animationDelay: '0s'}}
        />
        
        {/* Particle 2 */}
        <div 
          className="absolute top-2/5 right-1/4 w-1.5 h-1.5 bg-sanders-ocean rounded-full blur-sm animate-float opacity-50"
          style={{animationDuration: '15s', animationDelay: '3s'}}
        />
        
        {/* Particle 3 */}
        <div 
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-sanders-blue rounded-full blur-sm animate-float opacity-70"
          style={{animationDuration: '18s', animationDelay: '6s'}}
        />
        
        {/* Particle 4 */}
        <div 
          className="absolute top-3/5 right-1/6 w-2.5 h-2.5 bg-sanders-blue-glow rounded-full blur-sm animate-float opacity-40"
          style={{animationDuration: '14s', animationDelay: '2s'}}
        />
        
        {/* Particle 5 */}
        <div 
          className="absolute bottom-2/5 left-2/5 w-1.5 h-1.5 bg-sanders-ocean rounded-full blur-sm animate-float opacity-55"
          style={{animationDuration: '16s', animationDelay: '4s'}}
        />
      </div>
      
      {/* Subtle grid overlay for tech feel */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-sanders-blue/5 to-transparent animate-drift"
          style={{animationDuration: '30s'}}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-l from-transparent via-sanders-ocean/3 to-transparent animate-drift"
          style={{animationDuration: '40s', animationDelay: '15s'}}
        />
      </div>
    </div>
  );
};

export default HeroLightEffects;