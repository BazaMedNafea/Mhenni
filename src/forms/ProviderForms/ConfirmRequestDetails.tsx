import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addresses: z
    .array(
      z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        wilaya: z.string().min(1, "Wilaya is required"),
        zip: z.string().min(1, "Zip is required"),
      })
    )
    .optional()
    .default([]),
  description: z.string().optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  addresses: {
    street: string;
    city: string;
    wilaya: string;
    zip: string;
  }[];
  onSave: (userProfileData: UserFormData, requirementDesc: string) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const wilayaOptions = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
];

const ConfirmRequestDetails = ({
  onSave,
  isLoading,
  currentUser,
  addresses,
  title = "Confirm Delivery Details",
  buttonText = "Continue to payment",
}: Props) => {
  const flattenedUser = {
    email: currentUser.email || "",
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    addresses: addresses || [],
    description: "",
  };

  if (flattenedUser.addresses.length === 0) {
    flattenedUser.addresses.push({
      street: "",
      city: "",
      wilaya: "",
      zip: "",
    });
  }

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: flattenedUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSave({ ...data }, data.description || "")
        )}
        className='space-y-6 bg-white rounded-lg shadow-md p-8'
      >
        <div>
          <h2 className='text-3xl font-semibold text-gray-700'>{title}</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-600'>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className='bg-gray-50 border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring focus:ring-blue-200'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-600'>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-gray-50 border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring focus:ring-blue-200'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-600'>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-gray-50 border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring focus:ring-blue-200'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-600'>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder='Enter description'
                  className='h-32 resize-y w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring focus:ring-blue-200'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex flex-col md:flex-row gap-4'>
          {flattenedUser.addresses?.map(
            (
              _address: {
                street: string;
                city: string;
                wilaya: string;
                zip: string;
              },
              index: number
            ) => (
              <React.Fragment key={index}>
                <FormField
                  control={form.control}
                  name={`addresses.${index}.street`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} className='bg-white' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.city`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} className='bg-white' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.wilaya`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Wilaya</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className='bg-white border border-gray-300 rounded-lg p-2'
                        >
                          {wilayaOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.zip`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Zip</FormLabel>
                      <FormControl>
                        <Input {...field} className='bg-white' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </React.Fragment>
            )
          )}
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type='submit' className='bg-orange-500'>
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ConfirmRequestDetails;
