import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAddServiceRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  const addServiceRequest = async (requestDataArray: any[]) => {
    try {
      if (isAddingRequest) {
        console.log("Service request already in progress, skipping...");
        return;
      }

      setIsAddingRequest(true);

      const accessToken = await getAccessTokenSilently();

      // Send each service request separately
      await Promise.all(
        requestDataArray.map(async (requestData) => {
          const response = await fetch(
            `${API_BASE_URL}api/my/customer/add-request`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Failed to add service request");
          }
        })
      );
    } catch (error: any) {
      console.error("Error adding service requests:", error);
      toast.error(error.toString());
    } finally {
      setIsAddingRequest(false);
    }
  };

  const {
    mutateAsync: addRequest,
    isLoading,
    isError,
    error,
  } = useMutation(addServiceRequest);

  return { addRequest, isLoading, isError, error };
};
