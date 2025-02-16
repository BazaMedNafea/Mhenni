import { Button, Card, Avatar } from "flowbite-react";
import { useGetServiceProviderMapById } from "../api/ServiceCategoryApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmDeliveryModal from "@/components/ConfirmDeliveryModal";
import { useGetMyUser } from "@/api/MyUserApi";
import LoginModal from "@/components/LoginModal";

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [serviceProviderId, setServiceProviderId] = useState<number | null>(
    null
  );
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const { currentUser, isLoading: userLoading } = useGetMyUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [_isBookingService, setIsBookingService] = useState(false);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        setServiceProviderId(parsedId);
      } else {
        setServiceProviderId(null);
      }
    }
  }, [id]);

  useEffect(() => {
    console.log(currentUser); // Debug line
  }, [currentUser]);

  const { serviceProviderMap, isLoading: serviceProviderLoading } =
    useGetServiceProviderMapById(serviceProviderId || 0);

  if (userLoading || serviceProviderLoading) {
    return <div>Loading...</div>;
  }

  if (!serviceProviderMap) {
    return <div>Service provider map not found</div>;
  }

  // Destructure data
  const {
    service,
    billing_rate_per_hour,
    experience_in_months,
    service_offering_desc,
    service_delivery_offer,
    provider,
  } = serviceProviderMap;

  const { service_name, service_category } = service;
  const { user, addresses } = provider;
  const { firstName, lastName, email, image } = user;

  const { discount_in_percentage, is_offer_accepted } =
    service_delivery_offer || {};

  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleBookService = () => {
    if (currentUser) {
      setShowDeliveryDetails(true);
      setIsBookingService(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleClose = () => {
    setShowDeliveryDetails(false);
    setShowLoginModal(false);
    setIsBookingService(false);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-yellow-50 min-h-screen">
      <div className="max-w-4xl w-full">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r flex items-center">
            <h2 className="text-3xl font-bold">
              Service Details: {service_name}
            </h2>
          </div>
          <div className="flex flex-col md:flex md:flex-row items-start md:items-start">
            <div className="md:w-1/2">
              <img
                src={serviceProviderMap.image}
                alt="Service Image"
                className="w-full h-64 object-cover md:rounded-none mt-7"
              />
            </div>
            <div className="md:w-1/2 p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Service Availability
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                {availableDays.map((day) => (
                  <div key={day} className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                      ✓
                    </span>
                    {day}: 11:00 AM - 07:00 PM
                  </div>
                ))}
              </div>
              <Button
                gradientDuoTone="yellowToOrange"
                className="w-full py-3 mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg"
                onClick={handleBookService}
              >
                Book Service for {billing_rate_per_hour} DA per hour
              </Button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Service Details
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {service_offering_desc}
            </p>
            <p className="mt-4 text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {service_category.category_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {experience_in_months} months
            </p>
            {service_delivery_offer && (
              <>
                <p className="text-gray-700">
                  <span className="font-semibold">Discount Offer:</span>{" "}
                  {discount_in_percentage}%
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Offer Accepted:</span>{" "}
                  {is_offer_accepted ? "Yes" : "No"}
                </p>
              </>
            )}
          </div>
          <div className="p-6 bg-gray-100 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar img={image} rounded={true} />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {firstName} {lastName}
                </h4>
                <p className="text-gray-600">
                  {addresses.map((address) => address.wilaya).join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-6">
                <p className="text-gray-600">{email}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Reviews
                </h4>
                <p className="text-gray-600">0 (No Reviews)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirm Delivery Details Modal */}
      {currentUser && showDeliveryDetails && (
        <ConfirmDeliveryModal
          currentUser={{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email || "",
          }}
          addresses={
            currentUser.customer?.addresses ||
            currentUser.provider?.addresses ||
            []
          }
          showDeliveryDetails={showDeliveryDetails}
          handleClose={handleClose}
          providerId={provider.id?.toString() || ""}
          selectedServices={[serviceProviderMap]} // Pass the selected service as an array
        />
      )}

      {/* Login Modal */}
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
    </div>
  );
};

export default ServiceDetailsPage;
