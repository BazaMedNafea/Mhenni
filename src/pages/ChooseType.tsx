import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faStore } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser, useUpdateUserType } from "@/api/MyUserApi";

type CardType = "customer" | "provider" | null;

const ChooseType = () => {
  const [selectedCard, setSelectedCard] = useState<CardType>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { currentUser } = useGetMyUser();
  const { updateUserType } = useUpdateUserType();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  useEffect(() => {
    console.log("Current user:", currentUser);
    if (currentUser) {
      if (currentUser.customer || currentUser.provider) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    }
  }, [currentUser, navigate]);

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleNextClick = async () => {
    if (selectedCard && !isAnimating && !isLoading && !isButtonLoading) {
      setIsButtonLoading(true);
      try {
        const auth0Id = user?.sub ?? "";
        const type = selectedCard === "customer" ? "Customer" : "Provider";
        await updateUserType({ auth0Id, type });
        setIsAnimating(true);
        setTimeout(() => {
          navigate("/complete-registration");
        }, 500);
      } catch (error) {
        console.error("Error updating user type:", error);
      } finally {
        setIsButtonLoading(false);
      }
    }
  };

  if (isLoading || !currentUser) {
    return <div></div>;
  }

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
            selectedCard === "customer"
              ? "scale-105 border-2 border-yellow-500"
              : ""
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
            selectedCard === "provider"
              ? "scale-105 border-2 border-yellow-500"
              : ""
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
        disabled={!selectedCard || isLoading || isButtonLoading}
      >
        {isButtonLoading ? (
          <div className='flex items-center justify-center'>
            <span className='animate-spin h-5 w-5 mr-2'>
              <svg
                className='h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            </span>
            <span>Loading...</span>
          </div>
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
};

export default ChooseType;
