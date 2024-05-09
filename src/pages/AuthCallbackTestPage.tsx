import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";

const Auth0CallbackTestPage = () => {
  const { handleRedirectCallback, getIdTokenClaims, user } = useAuth0();
  const { createUser } = useCreateMyUser();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await handleRedirectCallback();
        const idTokenClaims = await getIdTokenClaims();

        if (user && idTokenClaims) {
          // Create user based on the provided template
          await createUser({
            firstName: user.given_name || "",
            lastName: user.family_name || "",
            image: user.picture || "",
            mobile: "",
            auth0Id: user.sub ?? "", // Use nullish coalescing operator
            email: user.email ?? "", // Use nullish coalescing operator
            type: "Customer",
            id: "",
          });
        }
      } catch (error) {
        console.error("Error handling redirect callback:", error);
      }
    };

    handleRedirect();
  }, [handleRedirectCallback, getIdTokenClaims, user, createUser]);

  return <div>Loading...</div>;
};

export default Auth0CallbackTestPage;
