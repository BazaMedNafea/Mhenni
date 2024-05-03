// This is your TypeScript code based on the Prisma schema
export interface categoriestype {
  name: string;
  description: string;
  image: string;
}
export interface Provider {
  id: number;
  auth0Id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  is_individual: boolean;
  is_registered_office: boolean;
  office_address?: string;
  zip: string;
  description?: string;
}

export interface ProviderRating {
  provider_id: number;
  avg_punc_rating: number;
  avg_prof_rating: number;
  avg_eti_rating: number;
  avg_comm_rating: number;
  avg_price_rating: number;
  avg_overall_rating: number;
  last_updated_on: string; // Assuming this is a string representing date/time
}

export interface ProviderReviewLog {
  id: number;
  service_appointment?: ServiceAppointment;
  service_appointment_id: number;
  punctuality_rating: number;
  proficiency_rating: number;
  etiquettes_rating: number;
  communication_rating: number;
  price_rating: number;
  overall_rating: number;
  review?: string;
  review_date: string; // Assuming this is a string representing date/time
}

export interface ServiceCategory {
  id: number;
  category_name: string;
  image: string;
  services: Service[];
}

export interface Service {
  id: number;
  service_name: string;
  service_category_id: number;
  service_category: ServiceCategory;
  service_providers: ServiceProviderMap[];
}

export interface ServiceProviderMap {
  id: number;
  service_id: number;
  provider_id: number;
  billing_rate_per_hour: number;
  experience_in_months: number;
  service_offering_desc?: string;
  service: Service;
  provider: Provider;
  service_delivery_offer?: ServiceDeliveryOffer;
}

export interface User {
  customer: any;
  id: number;
  auth0Id: string;
  firstName: string;
  second_name?: string;
  lastName: string;
  email: string;
  mobile: string;
  addresses: Address[];
  service_request: ServiceRequest[];
}

export interface Address {
  id: number;
  customer_id: number;
  street: string;
  city: string;
  wilaya: string;
  zip: string;
  service_request: ServiceRequest[];
}

export interface ServiceDeliveryOffer {
  id: number;
  service_request_id: number;
  service_provider_map_id: number;
  discount_in_percentage?: number;
  is_offer_accepted?: boolean;
  service_request: ServiceRequest;
  service_provider_map: ServiceProviderMap;
  service_appointment: ServiceAppointment[];
}

export interface ServiceRequest {
  id: number;
  customer_id: number;
  address_id: number;
  service_id: number;
  requirement_desc?: string;
  expected_start_time: string; // Assuming this is a string representing date/time
  address: Address;
  service_delivery_offer: ServiceDeliveryOffer[];
}

export interface ServiceAppointment {
  id: number;
  service_delivery_offer_id: number;
  service_deliver_on: string; // Assuming this is a string representing date/time
  service_start_time: string; // Assuming this is a string representing date/time
  service_end_time?: string; // Assuming this is a string representing date/time
  service_delivery_offer: ServiceDeliveryOffer;
  provider_review_log?: ProviderReviewLog;
}

export interface Admin {
  id: number;
  password: string;
  email: string;
  image?: string;
}
