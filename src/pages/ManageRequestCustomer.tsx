import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerRequestCard from "@/components/RequestCardCustomer";
import { useGetMyCustomerRequests } from "@/api/MyCustomerApi";
import { Request } from "@/types";

type RequestState = "REQUESTED" | "OFFERED" | "ONGOING" | "COMPLETED";

const ManageRequestCustomer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<RequestState>("REQUESTED");
  const [loadingTab, setLoadingTab] = useState<boolean>(false);
  const { customerRequests, isLoading, error, refetch } =
    useGetMyCustomerRequests();

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

  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null);
  const [showReviewFormForRequest, setShowReviewFormForRequest] = useState<{
    [requestId: number]: boolean;
  }>({});

  useEffect(() => {
    if (customerRequests && !loadingTab) {
      setRequestsByState({
        REQUESTED: customerRequests.filter(
          (request) => request.state === "REQUESTED"
        ),
        OFFERED: customerRequests.filter(
          (request) => request.state === "OFFERED"
        ),
        ONGOING: customerRequests.filter(
          (request) => request.state === "ONGOING"
        ),
        COMPLETED: customerRequests.filter(
          (request) => request.state === "COMPLETED"
        ),
      });
    }
  }, [customerRequests, loadingTab]);

  const handleTabSelect = async (value: string) => {
    const requestState = value as RequestState;
    setSelectedTab(requestState);
    setLoadingTab(true);

    try {
      await refetch();
    } catch (error) {
      console.error("Error refetching data:", error);
    } finally {
      setLoadingTab(false);
    }
  };

  const moveRequestToTab = async (
    requestId: number,
    targetTab: RequestState
  ) => {
    const updatedRequests = { ...requestsByState };
    const targetState = targetTab;

    const currentTab = Object.entries(requestsByState).find(([_, requests]) =>
      requests.some((request) => request.id === requestId)
    );

    if (currentTab) {
      const [_currentTabName, requests] = currentTab;
      const index = requests.findIndex((request) => request.id === requestId);
      if (index !== -1) {
        const [removed] = requests.splice(index, 1);

        updatedRequests[targetState].unshift(removed);
        setRequestsByState(updatedRequests);

        try {
          setLoadingRequestId(requestId);
          await confirmDate(requestId, targetTab);
        } catch (error) {
          console.error("Error moving request:", error);
        } finally {
          setLoadingRequestId(null);
        }
      }
    }
  };

  const confirmDate = async (requestId: number, _targetTab: RequestState) => {
    try {
      console.log(`Date confirmed for request ${requestId}`);
    } catch (error) {
      console.error("Error confirming date:", error);
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
      <CustomerRequestCard
        key={request.id}
        requestId={request.id}
        serviceName={request.service.service_name}
        requestDescription={
          request.requirement_desc || "No description provided"
        }
        expectedStartTime={
          request.expected_start_time
            ? new Date(request.expected_start_time).toISOString()
            : ""
        }
        state={request.state}
        providerOffers={request.providerOffers || []}
        refreshCustomerRequests={async () => await refetch()}
        onAccept={() => moveRequestToTab(request.id, "ONGOING")}
        onReject={() => moveRequestToTab(request.id, "COMPLETED")}
        isLoading={loadingRequestId === request.id}
        showReviewForm={showReviewFormForRequest[request.id] || false}
        setShowReviewForm={(show: boolean) =>
          setShowReviewFormForRequest((prev) => ({
            ...prev,
            [request.id]: show,
          }))
        }
      />
    ));
  };

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error: {(error as Error)?.message || "An error occurred"}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={selectedTab}
        onValueChange={handleTabSelect}
        className="flex-grow"
      >
        <TabsList className="flex justify-between">
          <TabsTrigger
            value="REQUESTED"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="OFFERED"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Offered
          </TabsTrigger>
          <TabsTrigger
            value="ONGOING"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            On Going
          </TabsTrigger>
          <TabsTrigger
            value="COMPLETED"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="REQUESTED"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.REQUESTED)}
        </TabsContent>

        <TabsContent
          value="OFFERED"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.OFFERED)}
        </TabsContent>

        <TabsContent
          value="ONGOING"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.ONGOING)}
        </TabsContent>

        <TabsContent
          value="COMPLETED"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {renderTabContent(requestsByState.COMPLETED)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRequestCustomer;
