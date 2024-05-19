import { FormProvider, useForm } from "react-hook-form";
import ManageServiceForm from "../forms/ProviderForms/AddServiceForm";

const AddServicePage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ManageServiceForm />
      </form>
    </FormProvider>
  );
};

const onSubmit = (data: any) => {
  // Handle form submission here
  console.log(data);
};

export default AddServicePage;
