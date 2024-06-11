import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import {
  useGetCategoryList,
  useGetServicesByCategory,
} from "@/api/ServiceCategoryApi";
import { Button } from "@/components/ui/button";
import { useAddServiceForProvider } from "@/api/MyProviderApi";
import { toast } from "sonner";
import { useState } from "react";
import { ServiceData } from "@/types"; // Import from types.ts

// Simple FileUpload component (replace with your own if you have one)
const FileUpload = ({
  onFileChange,
}: {
  onFileChange: (file: File | undefined) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileChange(file); // file will be undefined if no file is selected
  };

  return (
    <Input
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="mt-2"
    />
  );
};

const AddService = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const { categories, isLoading: categoriesLoading } = useGetCategoryList();
  const selectedCategory = watch(`services.category`);
  const { services: categoryServices } =
    useGetServicesByCategory(selectedCategory);

  const [serviceImage, setServiceImage] = useState<File | undefined>(undefined);

  const { mutate: addServiceForProvider, isLoading } = useAddServiceForProvider(
    {
      onSuccess: (data) => {
        console.log("Service added successfully:", data);
        setServiceImage(undefined); // Reset image state after successful upload
      },
      onError: (error) => {
        console.error("Error adding service:", error);
      },
    }
  );

  const onSubmit = (data: any) => {
    const serviceData: ServiceData = {
      serviceId: data.services.service,
      billingRatePerHour: data.services.billingRate,
      experienceInMonths: data.services.experience,
      serviceOfferingDesc: data.services.description,
      serviceImage: serviceImage, // This is now File | undefined
    };

    addServiceForProvider(serviceData);
  };

  const handleInvalidSubmit = () => {
    if (errors.services) {
      const errorMessage = Object.values(errors.services).join(", ");
      toast.error(`Please fill in the following fields: ${errorMessage}`);
    }
  };

  if (categoriesLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}>
      <div className="bg-white rounded-md shadow-md p-6 mb-4">
        {/* Existing form fields */}
        <FormField
          control={control}
          name={`services.category`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 mb-6">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedCategory && (
          <FormField
            control={control}
            name={`services.service`}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 mb-6">
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryServices?.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          {service.service_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name={`services.billingRate`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 mb-6">
              <FormLabel>Billing Rate (DA/Hr)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Enter billing rate"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`services.experience`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 mb-6">
              <FormLabel>Experience (Months)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter experience"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`services.description`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 mb-6">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Enter description"
                  className="h-32 resize-y w-full border rounded-md p-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Image Upload Field */}
        <FormItem className="flex flex-col gap-4 mb-6">
          <FormLabel>Service Image</FormLabel>
          <FileUpload onFileChange={setServiceImage} />
          {serviceImage && (
            <p className="text-sm text-gray-500">
              Selected file: {serviceImage.name}
            </p>
          )}
        </FormItem>
      </div>

      <Button type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AddService;
