import React from "react";

// Clean background design without particles - Light mode: clean white, Dark mode: deep blue with soft blue lights
const HeroCleanBackground: React.FC = () => {
  return (
    <>
      {/* Base clean background */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-white dark:bg-slate-900" />
      </div>
      
      {/* Dark mode only: Soft blue ambient lights */}
      <div className="absolute inset-0 z-[2] pointer-events-none dark:block hidden overflow-hidden">
        {/* Large soft glow - top left */}
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-blue-500/8 via-blue-400/3 to-transparent rounded-full blur-[80px] transform -translate-x-1/3 -translate-y-1/4" />
        
        {/* Medium glow - center right */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[350px] bg-gradient-radial from-blue-400/6 via-blue-300/2 to-transparent rounded-full blur-[60px] transform translate-x-1/4" />
        
        {/* Small accent lights */}
        <div className="absolute top-1/4 left-1/2 w-[300px] h-[200px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full blur-[40px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[180px] bg-gradient-radial from-blue-500/4 to-transparent rounded-full blur-[50px]" />
        
        {/* Extra large background ambient */}
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[600px] bg-gradient-radial from-blue-400/3 via-blue-400/1 to-transparent rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  );
};

export default HeroCleanBackground;