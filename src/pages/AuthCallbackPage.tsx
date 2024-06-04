import { useCreateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WelcomePage from "./WelcomePage";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { createUser } = useCreateMyUser();
  const { currentUser } = useGetMyUser();
  const hasCreatedCustomer = useRef(false);
  const returnTo = localStorage.getItem("returnTo") || "/";

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

        if (currentUser) {
          console.log("Current user data:", currentUser);
          if (currentUser.customer || currentUser.provider === null) {
            console.log("User type is null, navigating to choose-type page.");
            navigate("/choose-type");
          } else {
            console.log("User type is not null, navigating to previous page.");
            navigate(returnTo); // Redirect to the returnTo path from local storage
          }
        } else {
          console.log("Current user data is not available.");
        }
      } else {
        console.log("User is not authenticated.");
        // Handle the case when the user is not authenticated
        // Navigate to login page or show error message
      }
    };

    handleCallback();
  }, [createUser, currentUser, navigate, user, isAuthenticated, returnTo]);

  return (
    <>
      <WelcomePage />
    </>
  );
};

export default AuthCallbackPage;
