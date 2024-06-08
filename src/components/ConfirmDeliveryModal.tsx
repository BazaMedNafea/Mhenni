import React from "react";
import ConfirmRequestDetails from "@/forms/ProviderForms/ConfirmRequestDetails";
import { useAddServiceRequest } from "@/api/MyCustomerApi";
import { toast } from "sonner";
import { ServiceProviderMap } from "@/types";
import { useNavigate } from "react-router-dom";

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
  selectedServices: ServiceProviderMap[];
}

const ConfirmDeliveryModal: React.FC<ConfirmDeliveryModalProps> = ({
  currentUser,
  addresses,
  showDeliveryDetails,
  handleClose,
  providerId,
  selectedServices,
}) => {
  const { addRequest, isLoading: isAddingRequest } = useAddServiceRequest();
  const navigate = useNavigate();

  const handleSaveDeliveryDetails = async (userProfileData: any) => {
    const { email, firstName, lastName, addresses, description } =
      userProfileData;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !addresses ||
      selectedServices.length === 0
    ) {
      console.error(
        "Missing required fields in userProfileData or selectedServices"
      );
      toast.error(
        "Please fill in all required fields and select at least one service"
      );
      return;
    }

    const address = addresses[0];

    const serviceRequests = selectedServices.map((service) => ({
      id: service.id,
      serviceId: service.service.id,
      requirementDesc: description, // Use the description value here
      providerId: providerId,
      customAddress: {
        street: address.street,
        city: address.city,
        wilaya: address.wilaya,
        zip: address.zip,
      },
    }));

    try {
      const newOrderIds = await addRequest(serviceRequests);

      if (newOrderIds && newOrderIds.length > 0) {
        // Save the new order IDs to local storage
        localStorage.setItem("newOrderIds", newOrderIds.join(","));

        // Navigate to the order status page for each order ID
        navigate(`/orders/${newOrderIds.join(",")}`);
      } else {
        console.error("No order IDs returned from the API");
        toast.error("Failed to add service request");
      }
    } catch (error) {
      console.error("Error adding service request:", error);
      toast.error("Failed to add service request");
    }
  };

  return (
    <>
      {showDeliveryDetails && (
        <>
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={handleClose}
          ></div>
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div
              className={`bg-white rounded-lg p-6 max-w-2xl mx-auto relative confirm-delivery-details ${
                showDeliveryDetails ? "show" : ""
              }`}
            >
              <button
                onClick={handleClose}
                className='absolute top-0 right-0 m-4'
              >
                X
              </button>
              <div className='max-h-[80vh] overflow-y-auto'>
                <div className='mb-4'>
                  <ConfirmRequestDetails
                    currentUser={{
                      firstName: currentUser?.firstName,
                      lastName: currentUser?.lastName,
                      email: currentUser?.email ? currentUser?.email : "",
                    }}
                    addresses={addresses}
                    onSave={handleSaveDeliveryDetails}
                    isLoading={isAddingRequest}
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
