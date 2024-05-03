// In UserForm.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserForm = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true); // Initialize to true

  const handleBackClick = () => {
    navigate("/choose-type");
  };

  const handleFinishClick = () => {
    navigate("/");
  };

  useEffect(() => {
    // Set isAnimating to false after a brief delay to allow the animation to complete
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Adjust delay as needed to match animation duration

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] ${
        isAnimating ? "slide-in" : ""
      }`}
    >
      <div className='bg-white rounded-lg shadow-md px-8 py-6 w-full max-w-md mb-4 transition-transform duration-500 translate-x-0 opacity-100'>
        <h3 className='text-xl font-bold text-[#222831] mb-4'>
          Complete Information Form
        </h3>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='First Name'
            className='border-2 border-[#222831] rounded-md px-3 py-2 w-full focus:outline-none text-gray-700'
          />
        </div>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Last Name'
            className='border-2 border-[#222831] rounded-md px-3 py-2 w-full focus:outline-none text-gray-700'
          />
        </div>
        <div className='flex justify-between'>
          <button
            className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center'
            onClick={handleBackClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
            Back
          </button>
          <button
            className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center'
            onClick={handleFinishClick}
          >
            <FontAwesomeIcon icon={faCheckCircle} className='mr-2' />
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
