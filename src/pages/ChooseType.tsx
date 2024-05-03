// In ChooseType.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faStore } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type CardType = "customer" | "provider" | null;

const ChooseType = () => {
  const [selectedCard, setSelectedCard] = useState<CardType>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleNextClick = () => {
    if (selectedCard && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate("/complete-registration");
      }, 500); // Delay to allow for the transition effect
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] ${
        isAnimating ? "slide-out" : ""
      }`}
    >
      <h2 className='text-2xl font-bold mb-6 text-center text-[#222831]'>
        Choose Your Type
      </h2>
      <div className='flex justify-center mb-8'>
        <div
          className={`card bg-white rounded-lg shadow-md px-8 py-6 mx-4 cursor-pointer transform transition-transform duration-300 ${
            selectedCard === "customer" ? "scale-105" : ""
          }`}
          onClick={() => handleCardClick("customer")}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className='text-6xl text-[#222831] mb-4'
          />
          <h3 className='text-xl font-bold text-[#222831] mb-2'>Customer</h3>
          <p className='text-gray-600'>
            Select this option if you're a customer.
          </p>
        </div>
        <div
          className={`card bg-white rounded-lg shadow-md px-8 py-6 mx-4 cursor-pointer transform transition-transform duration-300 ${
            selectedCard === "provider" ? "scale-105" : ""
          }`}
          onClick={() => handleCardClick("provider")}
        >
          <FontAwesomeIcon
            icon={faStore}
            className='text-6xl text-[#222831] mb-4'
          />
          <h3 className='text-xl font-bold text-[#222831] mb-2'>Provider</h3>
          <p className='text-gray-600'>
            Select this option if you're a service provider.
          </p>
        </div>
      </div>
      <button
        className={`bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 ${
          selectedCard ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleNextClick}
        disabled={!selectedCard}
      >
        Next
      </button>
    </div>
  );
};

export default ChooseType;
