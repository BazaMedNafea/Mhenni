import { Button } from "@/components/ui/button";
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

type Props = {
  index: number;
  removeService: () => void;
};

const ServiceItem = ({ index, removeService }: Props) => {
  const { control, watch } = useFormContext();
  const { categories, isLoading: categoriesLoading } = useGetCategoryList();
  const selectedCategory = watch(`services.${index}.category`);
  const { services: categoryServices } =
    useGetServicesByCategory(selectedCategory);

  if (categoriesLoading) return <div>Loading categories...</div>;

  if (!categories) {
    console.error("Categories data not available");
    return <div>Error: Categories data not available</div>;
  }

  return (
    <div className='bg-white rounded-md shadow-md p-6 mb-4'>
      <FormField
        control={control}
        name={`services.${index}.category`}
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 mb-6'>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select category' />
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
          name={`services.${index}.service`}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-4 mb-6'>
              <FormLabel>Service</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select service' />
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
        name={`services.${index}.billingRate`}
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 mb-6'>
            <FormLabel>Billing Rate</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='number'
                step='0.01'
                placeholder='Enter billing rate'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`services.${index}.experience`}
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 mb-6'>
            <FormLabel>Experience</FormLabel>
            <FormControl>
              <Input {...field} type='number' placeholder='Enter experience' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`services.${index}.description`}
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 mb-6'>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <textarea
                {...field}
                placeholder='Enter description'
                className='h-32 resize-y w-full border rounded-md p-2'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type='button'
        onClick={removeService}
        className='bg-red-500 p-2 rounded-full flex items-center justify-center'
      >
        Remove
      </Button>
    </div>
  );
};

export default ServiceItem;
