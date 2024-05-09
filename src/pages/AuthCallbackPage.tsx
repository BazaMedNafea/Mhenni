import { useCreateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user: User } = useAuth0();
  const { createUser } = useCreateMyUser();
  const { currentUser } = useGetMyUser();
  const hasCreatedCustomer = useRef(false);

  useEffect(() => {
    if (User && !hasCreatedCustomer.current) {
      console.log("Creating new user...");
      createUser({
        firstName: User.given_name || "",
        lastName: User.family_name || "",
        image: User.picture || "",
        mobile: "",
        auth0Id: User.sub || "",
        email: User.email || "",
        type: null,
        id: "",
      });
      console.log("User created successfully.");
      hasCreatedCustomer.current = true;
    }

    // Check if the current user has a type set to null
    if (currentUser) {
      console.log("Current user data:", currentUser);
      if (currentUser.type === null) {
        console.log("User type is null, navigating to choose-type page.");
        navigate("/choose-type");
      } else {
        console.log("User type is not null, navigating to home page.");
        navigate("/home");
      }
    } else {
      console.log("Current user data is not available.");
    }
  }, [createUser, navigate, User, currentUser]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
