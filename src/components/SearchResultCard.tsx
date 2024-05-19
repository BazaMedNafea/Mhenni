import React from "react";
import { Link } from "react-router-dom";
import { ServiceProviderMap } from "@/types";
import { Card } from "flowbite-react";

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

  return (
    <Card className='w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105'>
      <img
        src='https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15090.jpg?t=st=1714842568~exp=1714846168~hmac=34afa9f3dc7fced2a1000605a3f3cc56054704b49e0c4667cae9aff973f6fc36&w=740'
        alt='Service Image'
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h5 className='text-xl font-semibold text-gray-900 dark:text-white'>
          {serviceProviderMap.service.service_name}
        </h5>
        <div className='text-gray-500 dark:text-gray-400 mt-2'>
          <Link
            to={`/provider/${provider?.id}`}
            className='block hover:underline'
          >
            <p className='font-medium'>Provided by: {providerName}</p>
            <p className='text-sm'>
              Rate: ${serviceProviderMap.billing_rate_per_hour} per hour
            </p>
            <p className='text-sm'>
              Experience: {serviceProviderMap.experience_in_months} months
            </p>
          </Link>
        </div>
        <div className='flex items-center justify-between mt-3'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white'>
            ${serviceProviderMap.billing_rate_per_hour * 10}{" "}
            {/* Example pricing calculation */}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SearchResultCard;
