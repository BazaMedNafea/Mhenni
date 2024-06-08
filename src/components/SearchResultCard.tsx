import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ServiceProviderMap } from "@/types";
import { Card, Avatar, Button } from "flowbite-react";
import { FaStar } from "react-icons/fa";

interface SearchResultCardProps {
  serviceProviderMap: ServiceProviderMap;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  serviceProviderMap,
}) => {
  const provider = serviceProviderMap.provider;
  const providerName = provider
    ? `${provider.user.firstName || ""} ${provider.user.lastName || ""}`
    : "Unknown Provider";

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/service-details/${serviceProviderMap.id}`);
  };

  // Log the serviceProviderMap object to inspect its structure
  console.log(serviceProviderMap);

  return (
    <Card className='w-full bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='md:col-span-2'>
          <img
            src={serviceProviderMap.image}
            alt='Service Image'
            className='w-full h-64 object-cover'
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className='md:col-span-3 p-4'>
          <div className='flex justify-between items-center'>
            <Link to={`/service-details/${serviceProviderMap.id}`}>
              <h5 className='text-xl font-semibold text-gray-900 dark:text-white hover:underline'>
                {serviceProviderMap.service.service_name}
              </h5>
            </Link>
            <Button
              color='light'
              pill={true}
              className='text-sm font-medium hover:bg-gray-200'
            >
              <Link to={`/provider/${provider?.id}`}>View Profile</Link>
            </Button>
          </div>
          <div className='flex items-center mt-2'>
            <Avatar
              img={provider.user.image} // Using a default image as the provider object doesn't have an image URL
              rounded={true}
            />
            <div className='ml-3'>
              <Link
                to={`/provider/${provider?.id}`}
                className='block hover:underline'
              >
                <p className='font-medium'>{providerName}</p>
              </Link>
              <div className='flex items-center'>
                <div className='flex items-center text-yellow-400'>
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <span className='ml-2 text-gray-500 dark:text-gray-400'>
                  4.5 (120 reviews)
                </span>
              </div>
            </div>
          </div>
          <div className='text-gray-500 dark:text-gray-400 mt-2'>
            <p className='text-sm'>
              Experience: {serviceProviderMap.experience_in_months} months
            </p>
          </div>
          <div className='flex items-center justify-between mt-3'>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              {serviceProviderMap.billing_rate_per_hour} DZD{" "}
              {/* Example pricing calculation */}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchResultCard;
