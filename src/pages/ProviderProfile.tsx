import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Tabs components are imported correctly
import StarRatings from "react-star-ratings";
import Comment from "@/components/comment";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetProviderById,
  useGetOffersByProviderId,
} from "@/api/ProvidersApi";
import LoginModal from "@/components/LoginModal";
import { ServiceProviderMap } from "@/types";

const ServiceProviderPage = () => {
  const [selectedServices, setSelectedServices] = useState<
    ServiceProviderMap[]
  >([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal
  const { isAuthenticated } = useAuth0();
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();

  const { currentProvider, isLoading: isLoadingProvider } = useGetProviderById(
    providerId || ""
  );
  const { offers, isLoading: isLoadingOffers } = useGetOffersByProviderId(
    providerId || ""
  );

  useEffect(() => {
    setSelectedServices(selectedServices);
  }, [selectedServices]);

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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleOfferClick = (offer: ServiceProviderMap) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/service-details/${offer.id}`);
  };

  return (
    <div className="container mx-auto py-8 relative">
      <div className="flex items-center mb-8">
        {/* Service Provider Image */}
        <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-24 h-24">
          <img
            src={currentProvider?.user.image}
            alt={"image"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Service Provider Name and Description */}
        <div className="ml-6">
          <h1 className="text-4xl font-bold mb-2">
            {currentProvider?.user.firstName} {currentProvider?.user.lastName}
          </h1>
          <p className="text-gray-700 mb-4">{currentProvider?.user.bio}</p>
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold mr-2">Rating:</h2>
            <StarRatings
              rating={currentProvider?.providerRatings?.avg_overall_rating || 0}
              starRatedColor="gold"
              starEmptyColor="gray"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
            />
          </div>
          <p className="mt-2 text-xl font-medium text-gray-500 dark:text-gray-400">
            {currentProvider?.providerRatings?.avg_overall_rating?.toFixed(2)}{" "}
            out of 5
          </p>
          <p className="text-xl font-medium text-gray-500">
            {currentProvider?.providerRatings?.avg_eti_rating?.toLocaleString()}{" "}
            global ratings
          </p>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <Tabs defaultValue="offers" className="flex-grow">
          <TabsList className="flex justify-around bg-gray-100 rounded-md p-2 mb-4">
            <TabsTrigger
              value="offers"
              className="flex-1 text-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Offers
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="flex-1 text-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex-1 text-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
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
                    className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
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
                      className="rounded-lg w-full shadow-md"
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
      </div>
    </div>
  );
};

export default ServiceProviderPage;
