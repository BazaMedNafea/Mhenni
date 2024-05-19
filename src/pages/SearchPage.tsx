import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import {
  useGetCategoryList,
  useGetServiceProviderMapList,
} from "../api/ServiceCategoryApi";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component

const wilayaOptions = [
  "Adrar",
  "Chlef",
  // Add more wilayas here
];

export type SearchState = {
  searchQuery: string;
  sortOption: string;
  selectedCategory: string;
  selectedService: string;
  selectedWilaya: string | undefined;
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery,
    sortOption: "bestMatch",
    selectedCategory: "",
    selectedService: "",
    selectedWilaya: undefined,
  });
  const [_isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // Set the page size
  const [loading] = useState(false); // State for loading
  const [loadingPagination, setLoadingPagination] = useState(false); // State for loading pagination

  const {
    serviceProviderMaps,
    isLoading: isLoadingServiceProviderMaps,
    totalPages,
  } = useGetServiceProviderMapList(currentPage, pageSize, searchState);

  const { isLoading: isLoadingCategories } = useGetCategoryList();

  const [fetchedServices, setFetchedServices] = useState(false);

  useEffect(() => {
    if (
      (searchState.selectedCategory && !fetchedServices) ||
      searchState.selectedWilaya
    ) {
      setCurrentPage(1); // Reset currentPage to 1 when filtering criteria change
      setFetchedServices(false); // Reset fetchedServices flag
    }
  }, [searchState.selectedCategory, searchState.selectedWilaya]);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setLoadingPagination(true); // Set loading state to true when changing page
    setCurrentPage(newPage);
    setFetchedServices(false); // Reset fetchedServices flag
  };

  useEffect(() => {
    setLoadingPagination(false); // Reset loading state when service provider maps are loaded
  }, [serviceProviderMaps]);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState({
      ...searchState,
      searchQuery: searchFormData.searchQuery || "",
    });
    setCurrentPage(1); // Reset currentPage to 1 when performing a search
    setFetchedServices(false); // Reset fetchedServices flag
  };

  const resetSearch = () => {
    setSearchState({
      searchQuery: "",
      selectedWilaya: undefined,
      sortOption: "bestMatch",
      selectedCategory: "",
      selectedService: "",
    });
    setCurrentPage(1); // Reset currentPage to 1
    setFetchedServices(false); // Reset fetchedServices flag
  };

  // Display loading state while fetching services
  if (isLoadingCategories || isLoadingServiceProviderMaps || loading) {
    return <LoadingSpinner />;
  }

  const filteredServices = serviceProviderMaps.flatMap((serviceProviderMap) => {
    const serviceNameMatch = serviceProviderMap.service.service_name
      .toLowerCase()
      .includes(searchState.searchQuery.toLowerCase());
    const categoryNameMatch =
      serviceProviderMap.service.service_category &&
      serviceProviderMap.service.service_category.category_name
        .toLowerCase()
        .includes(searchState.searchQuery.toLowerCase());

    const categoryMatch =
      !searchState.selectedCategory ||
      (serviceProviderMap.service.service_category &&
        serviceProviderMap.service.service_category.id.toString() ===
          searchState.selectedCategory);

    const serviceMatch =
      !searchState.selectedService ||
      serviceProviderMap.service.id.toString() === searchState.selectedService;

    const wilayaMatch =
      !searchState.selectedWilaya ||
      serviceProviderMap.provider?.addresses.some(
        (address) => address.wilaya === searchState.selectedWilaya
      );

    if (
      (serviceNameMatch || categoryNameMatch) &&
      categoryMatch &&
      serviceMatch &&
      wilayaMatch
    ) {
      return serviceProviderMap;
    }

    return [];
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 p-4'>
      <div id='cuisines-list' className='mb-5 lg:mb-0'>
        <CuisineFilter
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
          onCategoryChange={(value: string) =>
            setSearchState((prevState) => ({
              ...prevState,
              selectedCategory: value,
            }))
          }
          onServiceChange={(value: string) =>
            setSearchState((prevState) => ({
              ...prevState,
              selectedService: value,
            }))
          }
          onWilayaChange={(value: string) =>
            setSearchState((prevState) => ({
              ...prevState,
              selectedWilaya: value,
            }))
          }
        />
      </div>

      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder='Search by Cuisine or Service Name'
          onReset={resetSearch}
          wilayaOptions={wilayaOptions}
        />
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          {searchState.searchQuery && (
            <>
              <SearchResultInfo total={filteredServices.length} city={""} />
              <SortOptionDropdown
                sortOption={searchState.sortOption}
                onChange={setSortOption}
              />
            </>
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loadingPagination || isLoadingServiceProviderMaps ? (
            <LoadingSpinner />
          ) : (
            filteredServices.map((serviceProviderMap) => (
              <SearchResultCard
                key={serviceProviderMap.id}
                serviceProviderMap={serviceProviderMap}
              />
            ))
          )}
        </div>

        <PaginationSelector
          page={currentPage}
          pages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
