import hero from "../assets/hero1.jpg";

import Test from "./herotext";

const Hero = () => {
  return (
    <div className='relative'>
      <img
        src={hero}
        className='w-full max-h-[600px] object-cover'
        alt='Hero'
      />
      <div className='absolute inset-0 flex items-center justify-center bg-black opacity-50'></div>
      <Test />
    </div>
  );
};

export default Hero;
