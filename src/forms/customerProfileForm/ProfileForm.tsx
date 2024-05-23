import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";
import React from "react";

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
});
export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm1 = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Continue to payment",
}: Props) => {
  const flattenedUser = {
    email: currentUser.email || "",
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    addresses: currentUser.customer?.addresses || [], // Ensure addresses array exists
  };
  if (flattenedUser.addresses.length === 0) {
    flattenedUser.addresses.push({
      street: "",
      city: "",
      wilaya: "",
      zip: "",
      id: 0,
      requests: [],
    });
  }

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: flattenedUser,
  });

  useEffect(() => {
    form.reset(flattenedUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
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
          {(flattenedUser.addresses.length === 0 ||
            !flattenedUser.addresses) && (
            <React.Fragment>
              <FormField
                control={form.control}
                name={`addresses.0.street`}
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
                name={`addresses.0.city`}
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
                name={`addresses.0.wilaya`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Wilaya</FormLabel>
                    <FormControl>
                      <Input {...field} className='bg-white' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`addresses.0.zip`}
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
          )}
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
                        <Input {...field} className='bg-white' />
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

export default UserProfileForm1;
