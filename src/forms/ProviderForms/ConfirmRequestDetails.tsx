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
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import { format } from "date-fns";
import { TimePickerWithPresets } from "@/components/TimePickerWithPresents";

const formSchema = z.object({
  email: z.string().optional(),
  firstName: z.string().min(1, "name is required"),
  lastName: z.string().min(1, "name is required"),
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
  date: z.string().optional(),
  time: z.string().optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  addresses: {
    street: string;
    city: string;
    wilaya: string;
    zip: string;
  }[];
  onSave: (userProfileData: UserFormData) => void;
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

const ProviderProfileForm = ({
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
        onSubmit={form.handleSubmit(onSave)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
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
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className='bg-white'>
                    <DatePickerWithPresets
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "MM/dd/yyyy") : "")
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <div className='bg-white'>
                    <TimePickerWithPresets
                      onSelect={(time) =>
                        field.onChange(time ? format(time, "p") : "")
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default ProviderProfileForm;
