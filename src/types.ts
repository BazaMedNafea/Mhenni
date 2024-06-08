import { ReactNode } from "react";

export interface User {
  bio: string;
  auth0Id?: string;
  email: string;
  firstName?: string;
  address?: Address;
  lastName?: string;
  mobile?: string;
  image?: string;
  type?: UserType | null;
  admin?: Admin | null;
  customer?: Customer | null;
  provider?: Provider | null;
}

export interface Provider {
  id: string;
  userId: string;
  isIndividual?: string | null;
  isRegistredOffice?: string | null;
  zip?: string | null;
  description?: string | null;
  providerRatings?: Rating | null;
  services: ServiceProviderMap[];
  addresses: Address[];
  user: User;
}

export interface Rating {
  provider_id: string;
  avg_punc_rating: number;
  avg_prof_rating: number;
  avg_eti_rating: number;
  avg_comm_rating: number;
  avg_price_rating: number;
  avg_overall_rating: number;
  last_updated_on: Date;
  provider: Provider;
}

export interface ReviewLog {
  id: number;
  service_appointment_id: number;
  punctuality_rating: number;
  proficiency_rating: number;
  etiquettes_rating: number;
  communication_rating: number;
  price_rating: number;
  overall_rating: number;
  review?: string | null;
  review_date: Date;
  service_appointment: Appointment;
}

export interface Category {
  id: number;
  category_name: string;
  image: string;
  services: Service[];
}

export interface Service {
  provider: Provider; // Update the type here
  service_image_url: string | undefined;
  estimatedDeliveryTime: ReactNode;
  id: number;
  service_name: string;
  service_category_id: number;
  service_category: Category;

  service_providers: ServiceProviderMap[];
  Request: Request[];
}
export interface ServiceProviderMap {
  image: string | undefined;
  id: number;
  service_id: number;
  provider_id: string;
  billing_rate_per_hour: number;
  experience_in_months: number;
  service_offering_desc?: string | null;
  service_delivery_offer: DeliveryOffer | null;
  provider: Provider;
  service: Service;
}

export interface Customer {
  id: string;
  userId: string;
  user: User;
  requests: Request[];
  addresses: Address[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  wilaya: string;
  zip: string;
  customerId?: string | null;
  providerId?: string | null;
  requests: Request[];
  customer?: Customer | null;
  provider?: Provider | null;
}

export interface DeliveryOffer {
  id: number;
  service_request_id: number;
  service_provider_map_id: number;
  discount_in_percentage?: number | null;
  is_offer_accepted?: boolean | null;
  service_appointment: Appointment[];
  service_provider_map: ServiceProviderMap;
  service_request: Request;
}

export interface Request {
  Service: any;
  providerOffers: never[];
  providerConfirmation: unknown;
  state: string;
  customerName: string;
  customerAddress: string;
  serviceName: string;
  requestDescription: string;
  expectedStartTime: string;
  id: number;
  customer_id: string;
  service_id: number;
  requirement_desc?: string | null;
  expected_start_time: string;
  service_delivery_offer: DeliveryOffer[];
  // Add the Address property here
  Address?: Address | null;
  custom_address_street?: string | null;
  custom_address_city?: string | null;
  custom_address_wilaya?: string | null;
  custom_address_zip?: string | null;
  customer: Customer;
  service: Service;
  addressId?: number | null;
}

export interface Appointment {
  id: number;
  service_delivery_offer_id: number;
  service_deliver_on: Date;
  service_start_time: Date;
  service_end_time?: Date | null;
  service_delivery_offer: DeliveryOffer;
  provider_review_log?: ReviewLog | null;
}

export interface Admin {
  id: string;
  userId: string;
  user: User;
}

export enum UserType {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer",
}

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type DayRange = {
  from: Date | null;
  to: Date | null;
};

export type SearchState = {
  searchQuery: string;
  priceRange: number;
  timeOfDay: string;
  sortOption: string;
  categoryId?: string; // Add this line
  serviceId?: string; // Add this line
};

export type categoriestype = {
  name: string;
  description?: string;
  image: string;
  icon: ReactNode;
  services: Array<{
    name: string;
    image: string;
  }>;
};

export type ServiceData = {
  serviceId: string;
  billingRatePerHour: number;
  experienceInMonths: number;
  serviceOfferingDesc: string;
  serviceImage?: File;
};
