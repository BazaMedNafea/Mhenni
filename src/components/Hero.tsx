import React from 'react';
import heroVideo from "../assets/hero6.mp4";
import Test from "./herotext";
import Test2 from "./herotext2"; // Assuming you have created Test2 component

const Hero = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        {isMobile ? <Test2 /> : <Test />}
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <video
          autoPlay
          loop
          muted
          className="w-3/4 lg:w-full h-auto object-contain"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;
