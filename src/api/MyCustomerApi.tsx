import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CustomAddress {
  street?: string;
  city?: string;
  wilaya?: string;
  zip?: string;
}

interface RequestData {
  serviceId: number;
  requirementDesc?: string;
  providerId: string;
  customAddress?: CustomAddress;
}

export const useAddServiceRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  const addServiceRequest = async (
    requestDataArray: RequestData[]
  ): Promise<number[]> => {
    try {
      if (isAddingRequest) {
        console.log("Service request already in progress, skipping...");
        return [];
      }

      setIsAddingRequest(true);

      const accessToken = await getAccessTokenSilently();

      // Send each service request separately and collect the responses
      const responses = await Promise.all(
        requestDataArray.map(async (requestData: RequestData) => {
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

          return response.json();
        })
      );

      // Assuming the API response contains the id
      const requestIds = responses.map((response) => response.id);

      return requestIds;
    } catch (error: unknown) {
      console.error("Error adding service requests:", error);
      toast.error((error as Error).toString());
      throw error; // Rethrow the error to be caught by useMutation
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
