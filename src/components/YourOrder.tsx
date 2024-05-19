import React, { useState } from "react";
import { Trash } from "lucide-react";
import { ServiceProviderMap } from "@/types";

interface YourOrderProps {
  order: ServiceProviderMap[];
  setOrder: React.Dispatch<React.SetStateAction<ServiceProviderMap[]>>;
  deliveryCost: number;
  showOrderSidebar: boolean;
  setShowOrderSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServices: ServiceProviderMap[]; // Add this line
  setSelectedServices: React.Dispatch<
    React.SetStateAction<ServiceProviderMap[]>
  >; // Add this line
  setShowDeliveryDetails: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

const YourOrder: React.FC<YourOrderProps> = ({
  order,
  setOrder,
  deliveryCost,
  showOrderSidebar,
  setShowOrderSidebar,
  selectedServices,
  setSelectedServices,
  setShowDeliveryDetails, // Add this line
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemoveItem = (index: number) => {
    const updatedOrder = [...order];
    const removedItem = updatedOrder.splice(index, 1)[0];

    setOrder(updatedOrder);

    const updatedSelectedServices = selectedServices.filter(
      (service: { id: number }) => service.id !== removedItem.id
    );

    setSelectedServices(updatedSelectedServices);
  };

  const handleDeleteAll = () => {
    setOrder([]);
    setSelectedServices([]);
  };
  const calculateTotal = () => {
    let total = 0;
    for (const item of order) {
      total += item.billing_rate_per_hour;
    }
    total += deliveryCost;
    return total.toFixed(2);
  };

  const handleGoToCheckout = () => {
    setShowOrderSidebar(false); // Hide the sidebar when "Go to Checkout" button is clicked
    setShowDeliveryDetails(true); // Show the Confirm Delivery Details window
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg p-6 transition-all duration-300 ${
          showOrderSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Your Order</h3>
          <span className="text-gray-500">£{calculateTotal()}</span>
        </div>
        <ul className="space-y-2">
          {order.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.service.service_name}</span>
              <span>${item.billing_rate_per_hour}/hr</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 ml-2"
              >
                <Trash size={16} />
              </button>
            </li>
          ))}
          <li className="flex justify-between">
            <span>Delivery</span>
            <span>£{deliveryCost.toFixed(2)}</span>
          </li>
        </ul>
        <button
          className="w-full bg-[#222831] text-white text-xl py-2 px-4 rounded-lg mt-4 hover:bg-[#5a6a82] transition-colors"
          onClick={() => setShowConfirmation(true)}
        >
          Delete All
        </button>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete all items from your order?
              </p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 mr-2"
                  onClick={() => {
                    setShowConfirmation(false);
                    handleDeleteAll();
                  }}
                >
                  Delete All
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className="w-full bg-[#222831] text-white text-xl py-2 px-4 rounded-lg mt-4 hover:bg-[#5a6a82] transition-colors"
          onClick={handleGoToCheckout}
        >
          Go to Checkout
        </button>
      </div>
    </>
  );
};

export default YourOrder;
