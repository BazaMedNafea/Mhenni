// OrderStatusPage.tsx

import React, { useEffect } from "react";
import { useGetOrdersByIds } from "@/api/MyOrderApi";
import OrderCard from "@/components/OrderCard";
import { useParams } from "react-router-dom";

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const orderIds = orderId ? orderId.split(",") : [];

  const {
    data: fetchedOrders,
    isLoading: isFetchedOrdersLoading,
    error: fetchedOrdersError,
  } = useGetOrdersByIds(orderIds);

  useEffect(() => {
    // Clear the newOrderIds from localStorage after fetching orders
    localStorage.removeItem("newOrderIds");
  }, []);

  if (isFetchedOrdersLoading) {
    return <div>Loading...</div>;
  }

  if (fetchedOrdersError) {
    return <div>Error fetching orders</div>;
  }

  if (!fetchedOrders || fetchedOrders.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div className='bg-gray-100 min-h-screen py-16'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-4xl font-bold text-green-600 text-center mb-10'>
          THANKS FOR YOUR PURCHASE!
        </h1>
        <div className='space-y-10'>
          {fetchedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
