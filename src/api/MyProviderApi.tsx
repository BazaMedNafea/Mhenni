import { useAuth0, GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { useQuery, QueryFunctionContext } from "react-query";
import { toast } from "sonner";
import { Request } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProviderRequests = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProviderRequestsRequest = async (
    context: QueryFunctionContext<
      [
        string,
        (options?: GetTokenSilentlyOptions | undefined) => Promise<string>
      ],
      any
    >
  ): Promise<Request[]> => {
    try {
      const [, getAccessTokenSilently] = context.queryKey;
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}api/my/provider/request`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch provider requests");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching provider requests:", error);
      throw error;
    }
  };

  const {
    data: providerRequests,
    isLoading,
    error,
  } = useQuery(
    ["fetchProviderRequests", getAccessTokenSilently],
    getProviderRequestsRequest,
    {
      enabled: !!getAccessTokenSilently,
      retry: false,
    }
  );

  if (error) {
    toast.error(error.toString());
  }

  return { providerRequests, isLoading };
};
