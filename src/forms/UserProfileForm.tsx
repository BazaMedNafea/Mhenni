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
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useUpdateUserProfilePicture } from "@/api/MyUserApi"; // Import the hook

const formSchema = z.object({
  email: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  image: z.string().optional(),
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

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const [profilePicture, setProfilePicture] = useState<string>(
    currentUser.image || ""
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateUserProfilePicture, isLoading: isUploading } =
    useUpdateUserProfilePicture();

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Trigger the upload function
      try {
        await updateUserProfilePicture(file);
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  };

  const flattenedUser = {
    email: currentUser.email || "",
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    profilePicture: currentUser.image || "",
    addresses:
      currentUser.customer?.addresses || currentUser.provider?.addresses || [],
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
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {title}
            </h2>
            <FormDescription>
              View and change your profile information here
            </FormDescription>
          </div>

          <div className="flex flex-col items-center mb-6">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg cursor-pointer"
              onClick={handleProfilePictureClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            {isUploading && <p>Uploading...</p>}
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className="bg-gray-100 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-100 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-100 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            {flattenedUser.addresses.map((_address, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Address {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.street`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.city`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.wilaya`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Wilaya</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.zip`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
            >
              {buttonText}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
