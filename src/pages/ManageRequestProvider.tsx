import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProviderRequestCard from "@/components/RequestCardProvider";
import { useGetProviderRequests } from "@/api/MyProviderApi";
import { Request } from "@/types";

const ManageRequestProvider = () => {
  const [selectedTab, setSelectedTab] = useState<string>("orders");
  const [loadingTab, setLoadingTab] = useState<boolean>(false);
  const { providerRequests, isLoading, refetch } = useGetProviderRequests();

  const [requestsByState, setRequestsByState] = useState<{
    REQUESTED: Request[];
    OFFERED: Request[];
    ONGOING: Request[];
    COMPLETED: Request[];
  }>({
    REQUESTED: [],
    OFFERED: [],
    ONGOING: [],
    COMPLETED: [],
  });

  useEffect(() => {
    if (providerRequests && !loadingTab) {
      setRequestsByState({
        REQUESTED: providerRequests.filter(
          (request) => request.state === "REQUESTED"
        ),
        OFFERED: providerRequests.filter(
          (request) => request.state === "OFFERED"
        ),
        ONGOING: providerRequests.filter(
          (request) => request.state === "ONGOING"
        ),
        COMPLETED: providerRequests.filter(
          (request) => request.state === "COMPLETED"
        ),
      });
    }
  }, [providerRequests, loadingTab]);

  const handleTabSelect = async (value: string) => {
    setSelectedTab(value);
    setLoadingTab(true);

    try {
      await refetch();
    } catch (error) {
      console.error("Error refetching data:", error);
    } finally {
      setLoadingTab(false);
    }
  };

  const getCustomerName = (request: Request) => {
    const { firstName, lastName } = request.customer.user;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return "Customer";
    }
  };

  const getCustomerAddress = (request: Request) => {
    return `${request.custom_address_street}, ${request.custom_address_city}, ${request.custom_address_wilaya} ${request.custom_address_zip}`;
  };

  const handleOfferCreated = (requestId: number) => {
    console.log(`Offer created for request ${requestId}`);
    moveRequestToTab(requestId, "OFFERED");
  };

  const handleReject = (requestId: number) => {
    console.log(`Rejected request ${requestId}`);
    moveRequestToTab(requestId, "COMPLETED");
  };

  const moveRequestToTab = (requestId: number, targetTab: string) => {
    const updatedRequests = { ...requestsByState };
    const targetState = targetTab.toUpperCase() as keyof typeof requestsByState;
    const index = updatedRequests.REQUESTED.findIndex(
      (request) => request.id === requestId
    );
    if (index !== -1) {
      const [removed] = updatedRequests.REQUESTED.splice(index, 1);
      updatedRequests[targetState].unshift(removed);
      setRequestsByState(updatedRequests);
    }
  };

  const renderTabContent = (requests: Request[]) => {
    if (loadingTab || isLoading) {
      return <div>Loading...</div>;
    }

    if (requests.length === 0) {
      return <div>No requests found.</div>;
    }

    return requests.map((request) => (
      <ProviderRequestCard
        key={request.id}
        requestId={request.id}
        customerName={getCustomerName(request)}
        customerAddress={getCustomerAddress(request)}
        serviceName={request.service.service_name}
        requestDescription={
          request.requirement_desc || "No description provided"
        }
        expectedStartTime={request.expected_start_time}
        customerProfileImage={request.customer.user.image}
        state={request.state}
        providerConfirmation={false}
        onAccept={() => handleOfferCreated(request.id)}
        onReject={() => handleReject(request.id)}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={selectedTab}
        onValueChange={handleTabSelect}
        className="flex-grow"
      >
        <TabsList className="flex justify-between">
          <TabsTrigger
            value="orders"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="offered"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Offered
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            On Going
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="orders"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.REQUESTED)}
        </TabsContent>

        <TabsContent
          value="offered"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.OFFERED)}
        </TabsContent>

        <TabsContent
          value="ongoing"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.ONGOING)}
        </TabsContent>

        <TabsContent
          value="completed"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.COMPLETED)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRequestProvider;
