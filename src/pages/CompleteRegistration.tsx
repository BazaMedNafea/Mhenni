// In UserForm.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";

const UserForm = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const { currentUser } = useGetMyUser();
  const returnTo = localStorage.getItem("returnTo") || "/";
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    type: "", // Default value for type
  });
  const { updateUser } = useUpdateMyUser();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.customer || currentUser.provider) {
        navigate("/"); // Redirect if user has a customer or provider record
      } else {
        setIsLoading(false); // Set loading state to false when user data is available
        setFormValues({
          firstName: currentUser.firstName || "",
          lastName: currentUser.lastName || "",
          type: currentUser.type || "", // Set the type from currentUser
        });
      }
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBackClick = () => {
    navigate("/choose-type");
  };

  const handleFinishClick = async () => {
    try {
      setIsLoading(true);
      await updateUser(formValues);
      setTimeout(() => {
        navigate(returnTo);
      }, 500);
    } catch (error) {
      console.error("Error updating user:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] ${
        isAnimating ? "slide-in" : ""
      }`}
    >
      {" "}
      <div className="bg-white rounded-lg shadow-md px-8 py-6 w-full max-w-md mb-4 transition-transform duration-500 translate-x-0 opacity-100">
        <h3 className="text-xl font-bold text-[#222831] mb-4">
          Complete Information Form
        </h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            className="border-2 border-[#222831] rounded-md px-3 py-2 w-full focus:outline-none text-gray-700"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            className="border-2 border-[#222831] rounded-md px-3 py-2 w-full focus:outline-none text-gray-700"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            name="type"
            value={formValues.type}
            onChange={handleInputChange}
            className="border-2 border-[#222831] rounded-md px-3 py-2 w-full focus:outline-none text-gray-700"
            disabled // Make the input disabled
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center"
            onClick={handleBackClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </button>
          <button
            className={`bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleFinishClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-2">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {/* Add your loading spinner SVG here */}
                  </svg>
                </span>
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Finish
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
