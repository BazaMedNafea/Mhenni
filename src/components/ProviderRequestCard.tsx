import React, { useState } from "react";
import ProviderOfferForm from "@/forms/ProviderForms/ProviderTimeOffer";

interface RequestCardProps {
  requestId: number;
  customerName: string;
  customerAddress: string;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string;
  customerProfileImage?: string;
  onAccept: (requestId: number) => void;
  onReject: (requestId: number) => void;
  state: string; // Add this line
}

const ProviderRequestCard: React.FC<RequestCardProps> = ({
  requestId,
  customerName,
  customerAddress,
  serviceName,
  requestDescription,
  expectedStartTime,
  customerProfileImage,
  onAccept,
  onReject,
}) => {
  const [showOfferForm, setShowOfferForm] = useState(false);

  const handleAccept = () => {
    setShowOfferForm(true);
  };

  const handleReject = () => {
    onReject(requestId);
  };

  const handleOfferCreated = () => {
    setShowOfferForm(false);
    onAccept(requestId);
    // Handle additional logic after offer creation, if needed
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        {customerProfileImage ? (
          <img
            src={customerProfileImage}
            alt={`${customerName}'s Profile`}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-gray-500 font-bold text-xl">
              {customerName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {serviceName}
          </h2>
          <p className="text-gray-600">{customerName}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Address:</strong> {customerAddress}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {requestDescription}
        </p>
        <p className="text-gray-700">
          <strong>Expected Start Time:</strong> {expectedStartTime}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition-colors duration-200"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>

      {showOfferForm && (
        <div className="mt-6">
          <ProviderOfferForm
            requestId={requestId}
            onOfferCreated={handleOfferCreated}
          />
        </div>
      )}
    </div>
  );
};

export default ProviderRequestCard;
