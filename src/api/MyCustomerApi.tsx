import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
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
export interface ProviderOffer {
  id: number;
  requestId: number;
  providerId: string;
  offerDate: string;
  offerTime: string;
  provider: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      image: string;
    };
  };
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

export const useGetMyCustomerRequests = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [customerRequests, setCustomerRequests] = useState<any[]>([]);

  const fetchMyCustomerRequests = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}api/my/customer/requests`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch customer requests");
      }

      const data = await response.json();
      setCustomerRequests(data);
    } catch (error: unknown) {
      setError(error);
      console.error("Error fetching customer requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCustomerRequests();
  }, []);

  return { customerRequests, isLoading, error };
};

export const useGetMyCustomerRequestById = (requestId: number) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [customerRequest, setCustomerRequest] = useState<any>(null);

  const fetchMyCustomerRequestById = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}api/my/customer/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch customer request");
      }

      const data = await response.json();
      setCustomerRequest(data);
    } catch (error: unknown) {
      setError(error);
      console.error("Error fetching customer request by ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCustomerRequestById();
  }, [requestId]);

  return { customerRequest, isLoading, error };
};

export const useGetProviderOffersForRequest = (requestId: number) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [providerOffers, setProviderOffers] = useState<ProviderOffer[]>([]);

  const fetchProviderOffersForRequest = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}api/my/customer/requests/${requestId}/offers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch provider offers");
      }

      const data = await response.json();
      setProviderOffers(data);
    } catch (error: unknown) {
      setError(error);
      console.error("Error fetching provider offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderOffersForRequest();
  }, [requestId]);

  return { providerOffers, isLoading, error };
};

// MyCustomerApi.tsx
export const useUpdateRequestStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRequestStatus = async ({
    requestId,
    expectedStartTime,
  }: {
    requestId: number;
    expectedStartTime: string;
  }): Promise<void> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}api/my/customer/requests/${requestId}/update-status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expectedStartTime }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update request status");
      }
    } catch (error: unknown) {
      console.error("Error updating request status:", error);
      throw error;
    }
  };

  const { mutate, isLoading, isError, error } =
    useMutation(updateRequestStatus);

  return { updateRequestStatus: mutate, isLoading, isError, error };
};
