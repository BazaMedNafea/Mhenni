import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  firstName: string;
  lastName: string;
  mobile?: string;
  id?: string;
  auth0Id: string;
  email: string;
  image: string;
  type: string; // Add type field
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (customer: CreateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}api/my/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create User");
      }
    } catch (error) {
      // If the user already exists, treat it as a success, not an error
      if (
        error instanceof Error &&
        error.message === "User with this email already exists"
      ) {
        console.log(
          "User with this email already exists, proceeding with login"
        );
        return; // Exit the function without throwing an error
      } else {
        // Log other errors
        console.error("Error creating customer:", error);
        throw error; // Re-throw the error for the caller to handle
      }
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

type UpdateMyUserRequest = {
  firstName: string;
  lastName: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    console.log("updateMyCustomerRequest called with formData:", formData);

    const accessToken = await getAccessTokenSilently();
    console.log("Access token retrieved:", accessToken);

    const auth0Id = user?.sub; // Get the auth0Id from the user object

    // Log the formData before making the request
    console.log("formData:", formData);

    const response = await fetch(`${API_BASE_URL}api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, auth0Id }), // Include auth0Id in the request body
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to update customer");
    }

    const jsonResponse = await response.json();
    console.log("API response data:", jsonResponse);

    return jsonResponse;
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    console.log("Customer profile updated successfully!");
    toast.success("Customer profile updated!");
  }

  if (error) {
    console.error("Error updating customer profile:", error);
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
