import React from "react";

interface RequestCardProps {
  requestId: number;
  customerName: string;
  customerAddress: string;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string;
  customerProfileImage?: string; // Added customerProfileImage prop
  onAccept: (requestId: number) => void;
  onReject: (requestId: number) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({
  requestId,
  customerName,
  customerAddress,
  serviceName,
  requestDescription,
  expectedStartTime,
  customerProfileImage, // Added customerProfileImage
  onAccept,
  onReject,
}) => {
  const handleAccept = () => {
    onAccept(requestId);
  };

  const handleReject = () => {
    onReject(requestId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {customerProfileImage ? (
          <img
            src={customerProfileImage}
            alt={`${customerName}'s Profile`}
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-gray-500 font-bold">
              {customerName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">{serviceName}</h2>
          <p className="text-gray-600">{customerName}</p>
        </div>
      </div>
      <div className="mb-4">
        <p>Address: {customerAddress}</p>
        <p>Description: {requestDescription}</p>
        <p>Expected Start Time: {expectedStartTime}</p>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
