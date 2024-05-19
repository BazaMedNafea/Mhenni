import React from "react";
import UserProfileForm1 from "@/forms/ProviderForms/ConfirmRequestDetails";
import { useAddServiceRequest } from "@/api/MyCustomerApi"; // Import the hook
import { toast } from "sonner";
import { ServiceProviderMap } from "@/types";

interface ConfirmDeliveryModalProps {
  providerId: string;
  currentUser: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
  };
  addresses: {
    street: string;
    city: string;
    wilaya: string;
    zip: string;
  }[];
  showDeliveryDetails: boolean;
  handleClose: () => void;
  selectedServices: ServiceProviderMap[]; // Add this line
}

const ConfirmDeliveryModal: React.FC<ConfirmDeliveryModalProps> = ({
  currentUser,
  addresses,
  showDeliveryDetails,
  handleClose,
  providerId,
  selectedServices, // Receive the selectedServices prop
}) => {
  const { addRequest, isLoading: isAddingRequest } = useAddServiceRequest();

  const handleSaveDeliveryDetails = (userProfileData: any) => {
    // Extract data from userProfileData
    const { email, firstName, lastName, addresses, date, time } =
      userProfileData;

    // Check if all required fields are present
    if (
      !email ||
      !firstName ||
      !lastName ||
      !addresses ||
      !date ||
      !time ||
      selectedServices.length === 0
    ) {
      // Handle missing fields error
      console.error(
        "Missing required fields in userProfileData or selectedServices"
      );
      toast.error(
        "Please fill in all required fields and select at least one service"
      );
      return;
    }

    // Assuming addresses array contains only one address
    const address = addresses[0];

    // Combine date and time into expectedStartTime in the required format
    const expectedStartTime = new Date(`${date} ${time}`).toISOString();

    // Prepare an array of service requests
    const serviceRequests = selectedServices.map((service) => ({
      serviceId: service.service.id, // Use the service ID from the selected service
      requirementDesc: "REQUIREMENT_DESCRIPTION_PLACEHOLDER", // Add a description if needed
      expectedStartTime: expectedStartTime,
      providerId: providerId, // Pass the received providerId
      customAddress: {
        street: address.street,
        city: address.city,
        wilaya: address.wilaya,
        zip: address.zip,
      },
    }));

    console.log("Service request data:", serviceRequests); // Log the request data array

    // Call the addRequest function from the hook with the array of service requests
    addRequest(serviceRequests);
  };

  return (
    <>
      {showDeliveryDetails && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          ></div>
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className={`bg-white rounded-lg p-6 max-w-2xl mx-auto relative confirm-delivery-details ${
                showDeliveryDetails ? "show" : ""
              }`}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 m-4"
              >
                X
              </button>
              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mb-4">
                  {/* Display user delivery details here */}
                  {/* For example: */}
                  <UserProfileForm1
                    currentUser={{
                      firstName: currentUser?.firstName,
                      lastName: currentUser?.lastName,
                      email: currentUser?.email ? currentUser?.email : "",
                    }}
                    addresses={addresses}
                    onSave={handleSaveDeliveryDetails} // Pass the function to handle saving delivery details
                    isLoading={isAddingRequest} // Pass loading state for UI feedback
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmDeliveryModal;
