import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  useGetMyCustomerRequestById,
  ProviderOffer,
  useUpdateRequestStatus,
  useConfirmRequestCompletion,
  useAddReview,
} from "@/api/MyCustomerApi";
import ReviewAndCommentPage from "../pages/ReviewAndCommentPage";

// Modal Styles
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface CustomerRequestCardProps {
  requestId: number;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string;
  state: string;
  providerOffers: ProviderOffer[];
  refreshCustomerRequests: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  isLoading: boolean;
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
}

const CustomerRequestCard: React.FC<CustomerRequestCardProps> = ({
  requestId,
  serviceName,
  requestDescription,
  expectedStartTime,
  state,
  providerOffers,
  refreshCustomerRequests,
  onAccept,
  onReject,
  showReviewForm,
  setShowReviewForm,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    customerRequest,
    isLoading: isFetching,
    error,
  } = useGetMyCustomerRequestById(requestId);
  const { updateRequestStatus, isLoading: isUpdating } =
    useUpdateRequestStatus();
  const { confirmRequestCompletion, isLoading: isConfirming } =
    useConfirmRequestCompletion();
  const { addReview, isLoading: isAddingReview } = useAddReview();

  const getStateStyle = (state: string): string => {
    switch (state.toLowerCase()) {
      case "requested":
        return "text-green-500";
      case "offered":
        return "text-blue-500";
      case "ongoing":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element here
  }, []);

  const handleConfirmDate = async () => {
    if (selectedDate) {
      try {
        await updateRequestStatus({
          requestId,
          expectedStartTime: selectedDate,
        });

        if (onAccept) {
          onAccept();
        }
      } catch (error) {
        console.error("Error updating request status:", error);
      }
    }
  };

  const handleConfirmCompletion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    try {
      const reviewData = {
        providerId: customerRequest?.provider?.id || "",
        requestId,
        punctualityRating: rating,
        proficiencyRating: rating,
        etiquettesRating: rating,
        communicationRating: rating,
        priceRating: rating,
        overallRating: rating,
        comment,
      };
      await addReview(reviewData);

      // Move the request to "COMPLETED" tab after review is submitted
      if (onReject) {
        onReject();
      }

      refreshCustomerRequests();
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const renderDetails = () => {
    if (isFetching) {
      return <div className="text-gray-700">Loading...</div>;
    }
    if (error) {
      return (
        <div className="text-red-500">
          Error: {(error as Error)?.message || "An error occurred"}
        </div>
      );
    }
    if (customerRequest) {
      return (
        <div>
          <p className="text-gray-700">
            <strong>Provider:</strong>{" "}
            {customerRequest.provider?.user?.firstName}{" "}
            {customerRequest.provider?.user?.lastName || ""}
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
                {customerRequest.deliveryOffer.is_offer_accepted ? "Yes" : "No"}
              </p>
            </div>
          )}
          {providerOffers.length > 0 && state.toLowerCase() === "offered" && (
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
                          <button
                            className={`mt-2 px-4 py-2 text-sm rounded ${
                              selectedDate === offer.offerTime
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => setSelectedDate(offer.offerTime)}
                            disabled={state.toLowerCase() !== "offered"}
                          >
                            {selectedDate === offer.offerTime
                              ? "Selected"
                              : "Select Date"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {selectedDate && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleConfirmDate}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Confirming..." : "Confirm Date"}
                </button>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
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
      </div>
      <div className="mt-4">{renderDetails()}</div>
      {state.toLowerCase() === "ongoing" && (
        <div className="mt-4">
          <button
            className={`px-4 py-2 bg-green-500 text-white rounded ml-4 ${
              isConfirming ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleConfirmCompletion(e)}
            disabled={isConfirming}
          >
            {isConfirming ? "Confirming..." : "Confirm Completion"}
          </button>
        </div>
      )}
      {showReviewForm && (
        <div className="mt-4">
          <ReviewAndCommentPage
            onSubmit={handleReviewSubmit}
            isLoading={isAddingReview}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        contentLabel="Confirm Completion"
        style={customModalStyles as any} // Override type checking issue
        ariaHideApp={false} // Disable this to remove the warning related to modal accessibility
      >
        <h2>Confirm Completion</h2>
        <p>Are you sure you want to confirm completion request?</p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded ml-4"
          onClick={async () => {
            await confirmRequestCompletion(requestId);
            setShowReviewForm(true);
            setShowConfirmModal(false);
          }}
          disabled={isConfirming}
        >
          {isConfirming ? "Confirming..." : "Confirm"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4"
          onClick={() => setShowConfirmModal(false)}
          disabled={isConfirming}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default CustomerRequestCard;
