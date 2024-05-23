// import { useParams } from "react-router-dom";
// import { useGetOrderById } from "@/api/MyOrderApi";

// const OrderStatusPage = () => {
//   const { orderId } = useParams();
//   const { order, isLoading, error } = useGetOrderById(orderId || "");

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching order</div>;
//   }

//   if (!order) {
//     return <div>Order not found</div>;
//   }

//   const {
//     id,
//     placedAt,
//     state,
//     total,
//     service,
//     provider,
//     Address,
//     custom_address_city,
//     custom_address_street,
//     custom_address_wilaya,
//     custom_address_zip,
//   } = order;

//   return (
//     <div className='space-y-10'>
//       <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
//         <div>
//           <h2 className='text-2xl font-bold'>Order #{id}</h2>
//           <p>Placed on: {placedAt}</p>
//         </div>
//         <div className='grid gap-10 md:grid-cols-2'>
//           <div>
//             <h3 className='text-xl font-bold mb-4'>Order Details</h3>
//             <div>
//               <p>Status: {state}</p>
//               <p>Total: {total}</p>
//               {/* Add more order details as needed */}
//             </div>
//           </div>
//           <div>
//             <h3 className='text-xl font-bold mb-4'>Service Provider</h3>
//             <div>
//               <p>
//                 {provider?.user.firstName} {provider?.user.lastName}
//               </p>
//               <p>
//                 {Address
//                   ? `${Address.street}, ${Address.city}, ${Address.wilaya}, ${Address.zip}`
//                   : `${custom_address_street}, ${custom_address_city}, ${custom_address_wilaya}, ${custom_address_zip}`}
//               </p>
//               <p>Service: {service?.service_name}</p>
//               {/* Add more service provider details as needed */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderStatusPage;
