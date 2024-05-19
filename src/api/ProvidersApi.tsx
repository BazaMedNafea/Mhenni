import { Provider } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { ServiceProviderMap } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProviderById = (providerId: string) => {
  const getProviderRequest = async (): Promise<Provider> => {
    const response = await fetch(
      `${API_BASE_URL}api/public/provider/${providerId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch provider");
    }

    return response.json();
  };

  const {
    data: currentProvider,
    isLoading,
    error,
  } = useQuery(["fetchProvider", providerId], getProviderRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentProvider, isLoading };
};

export const useGetOffersByProviderId = (providerId: string) => {
  const getOffersRequest = async (): Promise<ServiceProviderMap[]> => {
    const response = await fetch(
      `${API_BASE_URL}api/public/provider/${providerId}/offers`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch offers");
    }

    return response.json();
  };

  const {
    data: offers,
    isLoading,
    error,
  } = useQuery(["fetchOffers", providerId], getOffersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { offers, isLoading };
};
