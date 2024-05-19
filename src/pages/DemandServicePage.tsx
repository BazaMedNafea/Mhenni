import { useState } from "react";
import { useParams } from "react-router-dom";

const DemandServicePage = () => {
  useParams<{ providerId: string }>();

  // State for service demand details
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Function to submit service demand
  const submitServiceDemand = () => {
    // Here you can send the demand data to your backend
    console.log("Demand Date:", date);
    console.log("Demand Time:", time);
    console.log("Address:", address);
    console.log("Payment Method:", paymentMethod);
    // You can add further logic to handle the submission, such as validation or API calls
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Demand Service</h1>
      <form className='mb-4'>
        <div className='mb-4'>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700'
          >
            Date
          </label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full rounded-lg border-gray-300 border p-2'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='time'
            className='block text-sm font-medium text-gray-700'
          >
            Time
          </label>
          <input
            type='time'
            id='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='w-full rounded-lg border-gray-300 border p-2'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Address
          </label>
          <textarea
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter your address...'
            className='w-full rounded-lg border-gray-300 border p-2'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='paymentMethod'
            className='block text-sm font-medium text-gray-700'
          >
            Payment Method
          </label>
          <select
            id='paymentMethod'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='w-full rounded-lg border-gray-300 border p-2'
          >
            <option value=''>Select payment method</option>
            <option value='credit_card'>Credit Card</option>
            <option value='paypal'>PayPal</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>
        <button
          type='button'
          onClick={submitServiceDemand}
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'
        >
          Submit Demand
        </button>
      </form>
    </div>
  );
};

export default DemandServicePage;
