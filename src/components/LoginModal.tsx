import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const LoginModal: React.FC<{ setShowLoginModal: (value: boolean) => void }> = ({
  setShowLoginModal,
}) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      // Store the current page URL in local storage before redirecting to login
      localStorage.setItem("returnTo", window.location.pathname);
      setShowLoginModal(false);
      await loginWithRedirect();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Suppress "Login required" error
        if (error.message !== "Login required") {
          console.error(error);
          toast.error("An error occurred during login. Please try again.");
        }
      } else {
        console.error("An unknown error occurred during login.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
        <p className="mb-4">You need to log in to add items to your cart.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
