import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const LoadingSpinner: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <BiLoaderAlt className='animate-spin text-blue-500 text-4xl' />
    </div>
  );
};

export default LoadingSpinner;
