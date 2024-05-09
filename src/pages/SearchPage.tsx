// SearchPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";

// Import the Service and ServiceCategory types from your types.ts file
import { Service, ServiceCategory } from "../types";

export type SearchState = {
  searchQuery: string;
  page: number;
  priceRange: number;
  timeOfDay: string;
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams<{ city: string }>();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    priceRange: 0,
    timeOfDay: "morning",
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Example ServiceCategory object
  const exampleServiceCategory: ServiceCategory = {
    id: 1,
    category_name: "Category1",
    image: "path/to/category1_image.jpg",
    services: [], // This should be an array of Service instances
  };

  // Example service object using the correct ServiceCategory type
  const service: Service = {
    id: 1,
    service_name: "Service A",
    estimatedDeliveryTime: "30 minutes", // ReactNode can be a string if it's just text
    image: "service_image.jpg",
    service_category_id: exampleServiceCategory.id,
    service_category: exampleServiceCategory, // Assign the ServiceCategory object
    service_providers: [], // This should be an array of ServiceProviderMap instances
    // other required properties
  };

  // Function to handle sort option change
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  // Function to handle selected cuisines change
  const setSelectedCuisines = (priceRange: number, timeOfDay: string, selectedDate: string) => {
    // Assuming you have a function to get cuisines based on the criteria
    // Update the state with the new price range, time of day, and selected date
    setSearchState((prevState) => ({
      ...prevState,
      priceRange,
      timeOfDay,
      // selectedCuisines would be determined here based on the criteria
      page: 1,
    }));
  };

  // Function to handle page change
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Function to handle search query submission
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  // Function to reset search
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
      // Reset priceRange, timeOfDay, and sortOption to their default values
      priceRange: 0,
      timeOfDay: "morning",
      sortOption: "bestMatch",
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        {/* CuisineFilter component */}
        <CuisineFilter
          priceRange={searchState.priceRange}
          timeOfDay={searchState.timeOfDay}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/* SearchBar component */}
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Service Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          {/* SearchResultInfo component */}
          <SearchResultInfo total={0} city={city || ""} />
          {/* SortOptionDropdown component */}
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>
        {/* SearchResultCard component */}
        <SearchResultCard key={service.id} service={service} />
        {/* PaginationSelector component */}
        <PaginationSelector
          page={searchState.page}
          pages={5}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
