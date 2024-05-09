import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "flowbite-react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const ServiceProviderPage = () => {
  const { providerId } = useParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Assume comments are fetched from a server or defined here
  const [comments] = useState([
    { user: "Alice", text: "Great service, very professional!" },
    { user: "Bob", text: "John was helpful and fixed the issue quickly." },
    // ... other comments
  ]);

  // Dummy service provider data
  const serviceProvider = {
    id: providerId,
    name: "John's Electricians",
    description:
      "John's Electricians provide high-quality electrical services in your area. Our team of experienced electricians ensures safety and reliability in every project.",
    image: "https://via.placeholder.com/300",
    services: [
      { id: 1, name: "Electrical Installation", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Lighting Repair", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Fuse Box Replacement", image: "https://via.placeholder.com/150" },
    ],
    offers: [
      { id: 1, name: "Off on Electrical Installation", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Free Inspection for Lighting Repair", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Off on Fuse Box Replacement", image: "https://via.placeholder.com/150" },
    ],
  };

  // Mock rating data
  const mockRating = {
    avg_punc_rating: 4.5,
    avg_prof_rating: 4.8,
    avg_eti_rating: 4.6,
    avg_comm_rating: 4.7,
    avg_price_rating: 4.2,
    avg_overall_rating: 4.6,
    total_ratings: 1745,
  };

  // Function to handle like
  const handleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  // Function to handle dislike
  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Price and Demand section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-6xl font-bold mb-4">{serviceProvider.name}</h1>
          <p className="text-gray-700 mb-4">{serviceProvider.description}</p>
        </div>
        <div className="flex items-center">
          <p className="text-2xl font-semibold mr-4">$50+</p>
          <Link to={`/demand-service/${providerId}`}
           className="inline-block bg-yellow-300 text-white text-xl py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors whitespace-nowrap  md:py-3 md:px-6"
           >
             Demand Service
           </Link>
        </div>
      </div>

      {/* Provider details */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 md:mr-8">
          <img src={serviceProvider.image} alt={serviceProvider.name} className="rounded-lg w-full" />
        </div>
        <div className="md:w-2/3">
          {/* Display mock rating data */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Rating:</h2>
            <Rating className="mb-2">
              {[...Array(5)].map((_, index) => (
                <Rating.Star key={index} filled={index < Math.round(mockRating.avg_overall_rating)} style={{ fill: 'gold' }} />
              ))}
              <p className="ml-2 text-xl font-medium text-gray-500 dark:text-gray-400">
                {mockRating.avg_overall_rating.toFixed(2)} out of 5
              </p>
            </Rating>
            <p className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              {mockRating.total_ratings.toLocaleString()} global ratings
            </p>
          </div>

          
         

          {/* Offers section */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Offers:</h2>
            <div className="grid grid-cols-3 gap-4">
              {serviceProvider.offers.map((offer) => (
                <div key={offer.id} className="text-center">
                  <img src={offer.image} alt={offer.name} className="rounded-lg mb-2" />
                  <p className="text-xl">{offer.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Like and dislike buttons */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Feedback:</h2>
            <div className="flex">
              <button onClick={handleLike} className={`flex items-center py-2 px-4 rounded-lg mr-2 hover:bg-gray-200 transition-colors ${liked ? 'text-gray-500' : ''}`}>
                <ThumbsUp className="w-6 h-6 mr-2" /> Like
              </button>
              <button onClick={handleDislike} className={`flex items-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors ${disliked ? 'text-gray-500' : ''}`}>
                <ThumbsDown className="w-6 h-6 mr-2" /> Dislike
              </button>
            </div>
          </div>

          {/* Comments section */}
          <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <strong>{comment.user}:</strong> {comment.text}
            </div>
          ))}
        </div>
</div>
      </div>
    </div>
    
    </div>
  );
};

export default ServiceProviderPage;
