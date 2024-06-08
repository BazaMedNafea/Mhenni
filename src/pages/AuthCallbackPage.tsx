import { useCreateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import WelcomePage from "./WelcomePage";

const AuthCallbackPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { createUser } = useCreateMyUser();
  const { currentUser } = useGetMyUser();
  const hasCreatedCustomer = useRef(false);
  const returnTo = localStorage.getItem("returnTo") || "/";
  console.log("returnTo value:", returnTo); // Added console log

  useEffect(() => {
    const handleCallback = async () => {
      if (isAuthenticated) {
        if (user && !hasCreatedCustomer.current) {
          console.log("Creating new user...");
          await createUser({
            firstName: user.given_name || "",
            lastName: user.family_name || "",
            image: user.picture || "",
            mobile: "",
            auth0Id: user.sub || "",
            email: user.email || "",
            type: null,
            id: "",
          });
          hasCreatedCustomer.current = true;
        }
      } else {
        console.log("User is not authenticated.");
        // Handle the case when the user is not authenticated
        // Navigate to login page or show error message
      }
    };
    handleCallback();
  }, [createUser, user, isAuthenticated]);

  useEffect(() => {
    if (currentUser) {
      console.log("Current user data:", currentUser);
      if (currentUser.customer || currentUser.provider) {
        // User is already registered as a customer or provider
        setTimeout(() => {
          navigate(returnTo);
        }, 0);
      } else {
        console.log("User type is null, navigating to choose-type page.");
        navigate("/choose-type");
      }
    } else {
      console.log("Current user data is not available.");
    }
  }, [currentUser, navigate, returnTo]);

  return (
    <>
      <WelcomePage />
    </>
  );
};

export default AuthCallbackPage;
