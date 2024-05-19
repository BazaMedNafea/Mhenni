import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Tabs components are imported correctly
import StarRatings from "react-star-ratings";
import YourOrder from "@/components/YourOrder";
import Comment from "@/components/comment";
import ConfirmDeliveryModal from "@/components/ConfirmDeliveryModal";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetProviderById,
  useGetOffersByProviderId,
} from "@/api/ProvidersApi";
import LoginModal from "@/components/LoginModal";
import { ServiceProviderMap } from "@/types";
import { useGetMyUser } from "@/api/MyUserApi";
// Import custom scrollbar styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ServiceProviderPage = () => {
  const [selectedServices, setSelectedServices] = useState<
    ServiceProviderMap[]
  >([]);
  const [showOrderSidebar, setShowOrderSidebar] = useState(false);
  const { isAuthenticated } = useAuth0();
  // const [liked, setLiked] = useState(false);
  // const [disliked, setDisliked] = useState(false);
  const [order, setOrder] = useState<ServiceProviderMap[]>(selectedServices);
  const deliveryCost = 0; // Assuming delivery cost is £1.50
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal
  const [isAddingOrder, setIsAddingOrder] = useState(false); // State to trigger animation
  const { providerId } = useParams<{ providerId: string }>();
  const { currentUser } = useGetMyUser();
  const { currentProvider, isLoading: isLoadingProvider } = useGetProviderById(
    providerId || ""
  );
  const { offers, isLoading: isLoadingOffers } = useGetOffersByProviderId(
    providerId || ""
  );

  useEffect(() => {
    setOrder(selectedServices);
  }, [selectedServices]);

  const handleClose = () => {
    setShowDeliveryDetails(false);
  };

  const [comments] = useState([
    { user: "Alice", text: "Great service, very professional!" },
    { user: "Bob", text: "John was helpful and fixed the issue quickly." },
    // ... other comments
  ]);

  // Dummy service provider data
  const serviceProvider = {
    offers: [
      {
        id: 1,
        name: "Off on Electrical Installation",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Free Inspection for Lighting Repair",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Off on Fuse Box Replacement",
        image: "https://via.placeholder.com/150",
      },
    ],
  };

  if (isLoadingProvider || isLoadingOffers) {
    return <div>Loading...</div>;
  }

  const handleOfferClick = (offer: ServiceProviderMap) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // Check if the offer is already in the selectedServices array
    if (
      selectedServices.some(
        (service) => service.id === offer.id && service === offer
      )
    ) {
      alert(`You have already selected "${offer.service.service_name}".`);
      return;
    }

    setSelectedServices((prevServices) => [...prevServices, offer]);
    setIsAddingOrder(true); // Trigger animation

    // Reset animation after 1 second
    setTimeout(() => {
      setIsAddingOrder(false);
    }, 1000);
  };

  // Function to count the number of items in the order
  const getOrderItemCount = () => {
    return order.length;
  };

  const closeOrderSidebar = () => {
    setShowOrderSidebar(false);
  };

  return (
    <div className="container mx-auto py-8 relative">
      <div className="flex items-center">
        {/* Service Provider Image */}
        <div className="rounded-full overflow-hidden border-4 border-white">
          <img
            src={currentProvider?.user.image}
            alt={"image"}
            className="inline-block rounded-lg"
          />
        </div>
        {/* Service Provider Name and Description */}
        <div className="ml-4 mr-60">
          <h1 className="text-4xl font-bold mb-4">
            {" "}
            {currentProvider?.user.firstName} {currentProvider?.user.lastName}
          </h1>
          <p className="text-gray-700 mb-4">{currentProvider?.description}</p>
          <h2 className="text-2xl font-semibold mb-2">Rating:</h2>
          <StarRatings
            rating={currentProvider?.providerRatings?.avg_overall_rating}
            starRatedColor="gold"
            starEmptyColor="gray"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
          <p className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            {currentProvider?.providerRatings?.avg_overall_rating.toFixed(2)}{" "}
            out of 5
          </p>
          <p className="text-xl font-medium text-gray-500">
            {currentProvider?.providerRatings?.avg_eti_rating.toLocaleString()}{" "}
            global ratings
          </p>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <Tabs defaultValue="offers" className="flex-grow">
          <TabsList className="flex justify-between">
            <TabsTrigger
              value="offers"
              className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              Offers
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Offers:</h2>
              <div className="grid grid-cols-1 gap-4">
                {offers?.map((offer: ServiceProviderMap) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-xl font-bold text-gray-900">
                      {offer.service.service_name}
                    </p>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      onClick={() => handleOfferClick(offer)}
                    >
                      Select for ${offer.billing_rate_per_hour}/hr
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="images">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Images:</h2>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
                {serviceProvider.offers.map((offer) => (
                  <div key={offer.id} className="mb-4 break-inside-avoid">
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="rounded-lg w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
              <div className="space-y-4">
                {/* Separate component for comment */}
                {comments.map((comment, index) => (
                  <Comment
                    key={index}
                    user={comment.user}
                    text={comment.text}
                    userPhotoUrl={""}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
        {/* Render backdrop overlay when the sidebar is open */}
        <div className="container mx-auto py-8 relative">
          {/* ... */}
          {showOrderSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeOrderSidebar}
            ></div>
          )}
          <YourOrder
            order={order}
            setOrder={setOrder}
            deliveryCost={deliveryCost}
            showOrderSidebar={showOrderSidebar}
            setShowOrderSidebar={setShowOrderSidebar}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices} // Add this line
            setShowDeliveryDetails={setShowDeliveryDetails} // Add this line
          />

          {/* ... */}
        </div>

        {/* Confirm Delivery Details Modal */}
        <ConfirmDeliveryModal
          currentUser={{
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            email: currentUser?.email ? currentUser?.email : "",
          }}
          addresses={
            currentUser?.customer?.addresses ||
            currentUser?.provider?.addresses ||
            []
          }
          showDeliveryDetails={showDeliveryDetails}
          handleClose={handleClose}
          providerId={providerId || ""}
          selectedServices={selectedServices} // Pass the selected services array
        />
        {/* Render the button to show number of orders */}
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-full fixed bottom-8 right-8 flex items-center justify-center ${
            isAddingOrder ? "animate-pulse" : ""
          }`}
          onClick={() => setShowOrderSidebar(true)}
        >
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <span className="ml-2">{getOrderItemCount()}</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceProviderPage;
