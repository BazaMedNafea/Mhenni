import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user: User } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedCustomer = useRef(false);

  useEffect(() => {
    if (User && !hasCreatedCustomer.current) {
      createUser({
        firstName: User.given_name || "", // Provide a default value if undefined
        lastName: User.family_name || "", // Provide a default value if undefined
        image: User.picture || "", // Provide a default value if undefined
        mobile: "",
        auth0Id: User.sub || "", // Provide a default value if undefined
        email: User.email || "", // Provide a default value if undefined
        type: "Customer",
        id: "",
      });
      hasCreatedCustomer.current = true;
    }
    navigate("/choose-type");
  }, [createUser, navigate, User]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
