// src/components/OrderCard.tsx

import React from "react";

interface Order {
  id: string;
  placedAt: string;
  state: string;
  total: number | undefined;
  service: {
    service_name: string;
  } | null;
  provider: {
    user: {
      firstName: string;
      lastName: string;
    };
  } | null;
  Address: {
    street: string;
    city: string;
    wilaya: string;
    zip: string;
  } | null;
  custom_address_city: string;
  custom_address_street: string;
  custom_address_wilaya: string;
  custom_address_zip: string;
}

interface Props {
  order: Order;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const {
    id,
    placedAt,
    state,
    total,
    service,
    provider,
    Address,
    custom_address_city,
    custom_address_street,
    custom_address_wilaya,
    custom_address_zip,
  } = order;

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div>
        <h2 className='text-2xl font-bold text-gray-800'>Order #{id}</h2>
        <p className='text-gray-600'>Placed on: {placedAt}</p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 mt-6'>
        <div>
          <h3 className='text-xl font-bold text-gray-800 mb-4'>
            Order Details
          </h3>
          <div className='text-gray-600'>
            <p>Status: {state}</p>
            <p>Total: {total ? `$${total.toFixed(2)}` : "N/A"}</p>
          </div>
        </div>
        <div>
          <h3 className='text-xl font-bold text-gray-800 mb-4'>
            Service Provider
          </h3>
          <div className='text-gray-600'>
            <p>
              {provider?.user.firstName} {provider?.user.lastName}
            </p>
            <p>
              {Address
                ? `${Address.street}, ${Address.city}, ${Address.wilaya}, ${Address.zip}`
                : `${custom_address_street}, ${custom_address_city}, ${custom_address_wilaya}, ${custom_address_zip}`}
            </p>
            <p>Service: {service?.service_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
