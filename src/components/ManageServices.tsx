import React, { useState } from "react";
import {
  useGetProviderServices,
  useUpdateProviderService,
  useDeleteProviderService,
} from "@/api/MyProviderApi";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ServiceProviderMap {
  id: number;
  service_id: number;
  provider_id: string;
  billing_rate_per_hour: number;
  experience_in_months: number;
  service_offering_desc: string | null;
  service: {
    id: number;
    service_name: string;
    service_category: {
      id: number;
      category_name: string;
      image: string;
    };
  };
}

type UpdateServiceData = {
  billingRatePerHour: number;
  experienceInMonths: number;
  serviceOfferingDesc: string;
};

const ManageServices = () => {
  const { providerServices, isLoading, refetch } = useGetProviderServices();
  const updateProviderServiceMutation = useUpdateProviderService();
  const deleteProviderServiceMutation = useDeleteProviderService();
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<number | null>(
    null
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEditService = (serviceId: number) => {
    setEditingServiceId(serviceId);
  };

  const handleUpdateService = (
    serviceId: number,
    updatedData: UpdateServiceData
  ) => {
    updateProviderServiceMutation.mutate(
      { id: serviceId, ...updatedData },
      {
        onSuccess: () => {
          setEditingServiceId(null);
          refetch();
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
  };

  const handleDeleteService = (serviceId: number) => {
    setDeletingServiceId(serviceId);
  };

  const handleConfirmDelete = (serviceId: number) => {
    deleteProviderServiceMutation.mutate(serviceId, {
      onSuccess: () => {
        setDeletingServiceId(null);
        refetch();
      },
    });
  };

  const handleCancelDelete = () => {
    setDeletingServiceId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>
      <div className="space-y-6">
        {providerServices?.map((service: ServiceProviderMap) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              {editingServiceId === service.id ? (
                <EditServiceForm
                  service={service}
                  onUpdate={handleUpdateService}
                  onCancel={handleCancelEdit}
                  isUpdating={updateProviderServiceMutation.isLoading}
                />
              ) : deletingServiceId === service.id ? (
                <DeleteConfirmation
                  service={service}
                  onConfirm={() => handleConfirmDelete(service.id)}
                  onCancel={handleCancelDelete}
                  isDeleting={deleteProviderServiceMutation.isLoading}
                />
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.service.service_name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Category:{" "}
                    <span className="font-medium">
                      {service.service.service_category.category_name}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Billing Rate:{" "}
                    <span className="font-medium">
                      {service.billing_rate_per_hour} DZD/hr
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Experience:{" "}
                    <span className="font-medium">
                      {service.experience_in_months} months
                    </span>
                  </p>
                  <p className="text-gray-600 mb-4">
                    Description:{" "}
                    <span className="font-medium">
                      {service.service_offering_desc}
                    </span>
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                      onClick={() => handleEditService(service.id)}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditServiceForm = ({
  service,
  onUpdate,
  onCancel,
  isUpdating,
}: {
  service: ServiceProviderMap;
  onUpdate: (serviceId: number, updatedData: UpdateServiceData) => void;
  onCancel: () => void;
  isUpdating: boolean;
}) => {
  const [billingRate, setBillingRate] = useState(service.billing_rate_per_hour);
  const [experience, setExperience] = useState(service.experience_in_months);
  const [description, setDescription] = useState(
    service.service_offering_desc || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      billingRatePerHour: billingRate,
      experienceInMonths: experience,
      serviceOfferingDesc: description,
    };
    onUpdate(service.id, updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="billingRate" className="block font-medium mb-1">
          Billing Rate
        </label>
        <input
          type="number"
          id="billingRate"
          value={billingRate}
          onChange={(e) => setBillingRate(parseFloat(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          step="0.01"
          disabled={isUpdating}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="experience" className="block font-medium mb-1">
          Experience
        </label>
        <input
          type="number"
          id="experience"
          value={experience}
          onChange={(e) => setExperience(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          disabled={isUpdating}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          disabled={isUpdating}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={onCancel}
          disabled={isUpdating}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const DeleteConfirmation = ({
  service,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  service: ServiceProviderMap;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        {service.service.service_name}
      </h3>
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this service?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ManageServices;
