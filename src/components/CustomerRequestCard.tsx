import React, { useState } from "react";
import {
  useGetMyCustomerRequestById,
  ProviderOffer,
} from "@/api/MyCustomerApi";

interface CustomerRequestCardProps {
  requestId: number;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string;
  state: string;
  providerOffers: ProviderOffer[];
}

const CustomerRequestCard: React.FC<CustomerRequestCardProps> = ({
  requestId,
  serviceName,
  requestDescription,
  expectedStartTime,
  state,
  providerOffers,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { customerRequest, isLoading, error } =
    useGetMyCustomerRequestById(requestId);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const getStateStyle = (state: string): string => {
    switch (state.toLowerCase()) {
      case "requested":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{serviceName}</h2>
        <p className="text-gray-600">{requestDescription}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Expected Start Time:</strong> {expectedStartTime}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold ${getStateStyle(state)}`}>
          {state.toUpperCase()}
        </span>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={handleShowDetails}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4">
          {isLoading ? (
            <div className="text-gray-700">Loading...</div>
          ) : error ? (
            <div className="text-red-500">
              Error: {(error as Error)?.message || "An error occurred"}
            </div>
          ) : customerRequest ? (
            <div>
              <p className="text-gray-700">
                <strong>Provider:</strong>{" "}
                {customerRequest.provider?.user?.firstName}{" "}
                {customerRequest.provider?.user?.lastName || ""}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {customerRequest.customerAddress}
              </p>
              {customerRequest.deliveryOffer && (
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Delivery Offer</h3>
                  <p className="text-gray-700">
                    <strong>Discount:</strong>{" "}
                    {customerRequest.deliveryOffer.discount_in_percentage}%
                  </p>
                  <p className="text-gray-700">
                    <strong>Offer Accepted:</strong>{" "}
                    {customerRequest.deliveryOffer.is_offer_accepted
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              )}
              {providerOffers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Provider Offers</h3>
                  <ul className="divide-y divide-gray-200">
                    {providerOffers.map((offer) => (
                      <li key={offer.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                            <div className="ml-4">
                              <p className="text-gray-800 font-semibold">
                                {offer.provider?.user?.firstName}{" "}
                                {offer.provider?.user?.lastName}
                              </p>
                              <p className="text-gray-600">
                                Offer Date:{" "}
                                {new Date(offer.offerDate).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600">
                                Offer Time:{" "}
                                {new Date(offer.offerTime).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CustomerRequestCard;
