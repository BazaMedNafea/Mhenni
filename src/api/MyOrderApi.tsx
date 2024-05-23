import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}api/my/orders/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("fetchMyOrders", getMyOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { orders, isLoading };
};
export const useGetOrdersByIds = (orderIds: string[]) => {
  const { getAccessTokenSilently } = useAuth0();

  const getOrdersByIdsRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const promises = orderIds.map(async (orderId) => {
      const response = await fetch(`${API_BASE_URL}api/my/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch order ${orderId}`);
      }

      return response.json();
    });

    return Promise.all(promises);
  };

  return useQuery(["fetchOrdersByIds", orderIds], getOrdersByIdsRequest, {
    enabled: orderIds.length > 0,
  });
};
