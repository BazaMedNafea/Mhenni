// ManageServicePage.tsx
import { FormProvider, useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddService from "@/pages/AddService";
import ManageServices from "@/components/ManageServices";

const ManageServicePage = () => {
  const methods = useForm({
    defaultValues: {
      services: {
        category: "",
        service: "",
        billingRate: "",
        experience: "",
        description: "",
      },
    },
  });

  return (
    <div className='flex flex-col h-full'>
      <FormProvider {...methods}>
        <Tabs defaultValue='orders' className='flex-grow'>
          <TabsList className='flex justify-between'>
            <TabsTrigger
              value='add-service'
              className='flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200'
            >
              Add Service
            </TabsTrigger>
            <TabsTrigger
              value='manage-services'
              className='flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200'
            >
              Manage Services
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='add-service'
            className='h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto'
          >
            <AddService />
          </TabsContent>
          <TabsContent
            value='manage-services'
            className='h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto'
          >
            <ManageServices />
          </TabsContent>
        </Tabs>
      </FormProvider>
    </div>
  );
};

export default ManageServicePage;
