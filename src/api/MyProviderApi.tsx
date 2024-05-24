import { useAuth0, GetTokenSilentlyOptions } from "@auth0/auth0-react";
import {
  useQuery,
  QueryFunctionContext,
  UseMutationOptions,
  useMutation,
} from "react-query";
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

type ServiceData = {
  serviceId: string;
  billingRatePerHour: number;
  experienceInMonths: number;
  serviceOfferingDesc: string;
};

export const useAddServiceForProvider = (
  _options?: UseMutationOptions<any, any, ServiceData>
) => {
  const { getAccessTokenSilently } = useAuth0();

  const addServiceForProviderMutation = useMutation(
    async (data: ServiceData) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `${API_BASE_URL}api/my/provider/add-service`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.message || "Failed to add service for provider"
          );
        }

        return response.json();
      } catch (error) {
        console.error("Error adding service for provider:", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.success("Service added successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error.message || "Failed to add service. Please try again."
        );
      },
    }
  );

  return addServiceForProviderMutation;
};

export const useGetProviderServices = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProviderServicesRequest = async (
    context: QueryFunctionContext<
      [
        string,
        (options?: GetTokenSilentlyOptions | undefined) => Promise<string>
      ],
      any
    >
  ): Promise<any[]> => {
    try {
      const [, getAccessTokenSilently] = context.queryKey;
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}api/my/provider/services`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch provider services");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching provider services:", error);
      throw error;
    }
  };

  const {
    data: providerServices,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchProviderServices", getAccessTokenSilently],
    getProviderServicesRequest,
    {
      enabled: !!getAccessTokenSilently,
      retry: false,
    }
  );

  if (error) {
    toast.error(error.toString());
  }

  return { providerServices, isLoading, refetch };
};

type UpdateServiceData = {
  id: number;
  billingRatePerHour: number;
  experienceInMonths: number;
  serviceOfferingDesc: string;
};

export const useUpdateProviderService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateProviderServiceMutation = useMutation(
    async (data: UpdateServiceData) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `${API_BASE_URL}api/my/provider/services/${data.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              billingRatePerHour: data.billingRatePerHour,
              experienceInMonths: data.experienceInMonths,
              serviceOfferingDesc: data.serviceOfferingDesc,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to update service");
        }

        return response.json();
      } catch (error) {
        console.error("Error updating service:", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.success("Service updated successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error.message || "Failed to update service. Please try again."
        );
      },
    }
  );

  return updateProviderServiceMutation;
};

export const useDeleteProviderService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteProviderServiceMutation = useMutation(
    async (serviceProviderId: number) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `${API_BASE_URL}api/my/provider/services/${serviceProviderId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete service");
        }

        return response.json();
      } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.success("Service deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error.message || "Failed to delete service. Please try again."
        );
      },
    }
  );

  return deleteProviderServiceMutation;
};
type OfferData = {
  requestId: number;
  offerDates: string[];
  offerTimes: string[];
};

export const useCreateProviderOffer = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createProviderOfferMutation = useMutation(
    async (data: OfferData) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `${API_BASE_URL}api/my/provider/request/${data.requestId}/offer`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              offerDates: data.offerDates,
              offerTimes: data.offerTimes,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to create provider offer");
        }

        return response.json();
      } catch (error) {
        console.error("Error creating provider offer:", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.success("Provider offer created successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error.message || "Failed to create provider offer. Please try again."
        );
      },
    }
  );

  return createProviderOfferMutation;
};
