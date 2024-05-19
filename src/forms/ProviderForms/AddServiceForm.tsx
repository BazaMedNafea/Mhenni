import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import ServiceItem from "@/components/ServiceItem";

const ManageServiceForm = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Manage Services</h2>
        <FormDescription>Add services you want to offer</FormDescription>
      </div>
      <div className='flex flex-col gap-8'>
        {fields.map((field, index) => (
          <ServiceItem
            key={field.id}
            index={index}
            removeService={() => remove(index)}
          />
        ))}
      </div>
      <Button
        type='button'
        onClick={() =>
          append({
            category: "",
            service: "",
            billingRate: "",
            experience: "",
            description: "",
          })
        }
      >
        Add Service
      </Button>
    </div>
  );
};

export default ManageServiceForm;
