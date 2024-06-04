import React, { useState } from "react";
import ProviderOfferForm from "@/forms/ProviderForms/ProviderTimeOffer";
import { useConfirmProviderRequestCompletion } from "@/api/MyProviderApi";
import { toast } from "sonner";

interface RequestCardProps {
  requestId: number;
  customerName: string;
  customerAddress: string;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string | null;
  customerProfileImage?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onConfirmCompletion?: () => void; // Add onConfirmCompletion prop
  state: string;
  providerConfirmation: boolean; // Add providerConfirmation prop
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
  onConfirmCompletion,
  state,
  providerConfirmation,
}) => {
  const [showOfferForm, setShowOfferForm] = useState(false);
  const confirmProviderRequestCompletionMutation =
    useConfirmProviderRequestCompletion(); // Hook for confirming provider request completion

  const handleAccept = () => {
    if (onAccept) {
      setShowOfferForm(true);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    }
  };

  const handleOfferCreated = () => {
    setShowOfferForm(false);
    if (onAccept) {
      onAccept();
    }
  };

  const handleConfirmCompletion = async () => {
    try {
      await confirmProviderRequestCompletionMutation.mutateAsync({
        requestId,
        customerConfirmation: true, // Assuming customer confirmation is true
      });
      // Assuming you want to show a success message after confirmation
      toast.success("Task finished successfully!");
      if (onConfirmCompletion) {
        onConfirmCompletion();
      }
    } catch (error: any) {
      console.error("Error confirming provider request completion:", error);
      // Show an error toast using your preferred toast library
      toast.error(
        error.message || "Failed to finish the task. Please try again."
      );
    }
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
          <strong>Expected Start Time:</strong>{" "}
          {expectedStartTime
            ? new Date(expectedStartTime).toLocaleString()
            : "No start time provided"}
        </p>
      </div>
      <div className="flex justify-end">
        {state === "REQUESTED" && (
          <>
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
          </>
        )}

        {state === "OFFERED" && (
          <div>Waiting for customer to choose a date</div>
        )}

        {state === "ONGOING" && !providerConfirmation && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition-colors duration-200"
            onClick={handleConfirmCompletion}
          >
            Finish the task
          </button>
        )}

        {providerConfirmation && (
          <div className="text-gray-700">Task completed </div>
        )}
      </div>

      {showOfferForm && state === "REQUESTED" && (
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
