// ServiceApi.tsx
import { Service, Category } from "@/types";
import { useQuery } from "react-query";
import { ServiceProviderMap } from "@/types";
import { SearchState } from "../pages/SearchPage"; // Adjust this path as per your project structure

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetServiceProviderMapList = (
  page: number,
  limit: number,
  searchState: SearchState
) => {
  const getServiceProviderMapListRequest = async (): Promise<{
    serviceProviderMaps: ServiceProviderMap[];
    totalPages: number;
  }> => {
    const { searchQuery, selectedCategory, selectedService, selectedWilaya } =
      searchState;

    const queryParams = new URLSearchParams();
    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));
    if (searchQuery) queryParams.append("query", searchQuery);
    if (selectedCategory) queryParams.append("category", selectedCategory);
    if (selectedService) queryParams.append("service", selectedService);
    if (selectedWilaya) queryParams.append("wilaya", selectedWilaya);

    const response = await fetch(
      `${API_BASE_URL}api/public/service/list?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch service provider maps");
    }

    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["fetchServiceProviderMapList", page, limit, searchState],
    getServiceProviderMapListRequest,
    {
      keepPreviousData: true,
    }
  );

  if (error) {
    console.error("Error fetching service provider maps:", error);
  }

  const fetchServiceProviderMaps = () => {
    refetch();
  };

  const getTotalPages = () => {
    return data ? data.totalPages : 0;
  };

  return {
    serviceProviderMaps: data?.serviceProviderMaps || [],
    isLoading,
    totalPages: getTotalPages(),
    fetchServiceProviderMaps,
  };
};

export const useGetCategoryList = () => {
  const getCategoryListRequest = async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}api/public/category/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("fetchCategories", getCategoryListRequest);

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return { categories, isLoading, error }; // Provide type for error
};

export const useGetCategoryById = (categoryId: number) => {
  const getCategoryByIdRequest = async (): Promise<Category> => {
    const response = await fetch(
      `${API_BASE_URL}api/public/category/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }

    return response.json();
  };

  const {
    data: category,
    isLoading,
    error,
  } = useQuery(["fetchCategory", categoryId], getCategoryByIdRequest);

  if (error) {
    console.error("Error fetching category:", error);
  }

  return { category, isLoading };
};
export const useGetServicesByCategory = (categoryId: string | undefined) => {
  const getServicesByCategoryRequest = async (): Promise<Service[]> => {
    if (!categoryId) {
      return []; // Return an empty array if no category is selected
    }

    const response = await fetch(
      `${API_BASE_URL}api/public/service/category/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services by category");
    }

    return response.json();
  };

  const {
    data: services,
    isLoading,
    error,
  } = useQuery(
    ["fetchServicesByCategory", categoryId],
    getServicesByCategoryRequest,
    {
      enabled: !!categoryId, // Only fetch services if a category is selected
    }
  );

  if (error) {
    console.error("Error fetching services by category:", error);
  }

  return { services, isLoading };
};

export const useGetServiceProviderMapById = (id: number) => {
  const getServiceProviderMapByIdRequest =
    async (): Promise<ServiceProviderMap> => {
      const response = await fetch(`${API_BASE_URL}api/public/service/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch service provider map");
      }

      return response.json();
    };

  const {
    data: serviceProviderMap,
    isLoading,
    error,
  } = useQuery(
    ["fetchServiceProviderMap", id],
    getServiceProviderMapByIdRequest
  );

  if (error) {
    console.error("Error fetching service provider map:", error);
  }

  return { serviceProviderMap, isLoading };
};
