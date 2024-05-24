import { useState, FormEventHandler } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerRequestCard from "@/components/CustomerRequestCard";
import { useGetMyCustomerRequests } from "@/api/MyCustomerApi";

const ManageRequestCustomer = () => {
  const [selectedTab, setSelectedTab] = useState("orders");
  const { customerRequests, isLoading, error } = useGetMyCustomerRequests();

  const handleTabChange: FormEventHandler<HTMLDivElement> = (event) => {
    setSelectedTab(event.currentTarget.getAttribute("data-tab") || "orders");
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

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
        defaultValue="orders"
        className="flex-grow"
        onChange={handleTabChange}
      >
        <TabsList className="flex justify-between bg-gray-100 rounded-lg mt-4">
          <TabsTrigger
            value="orders"
            data-tab="orders"
            className={`flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200 ${
              selectedTab === "orders" ? "bg-gray-200" : ""
            }`}
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="manage-services"
            data-tab="manage-services"
            className={`flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200 ${
              selectedTab === "manage-services" ? "bg-gray-200" : ""
            }`}
          >
            Manage Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={selectedTab}
          className="h-full bg-gray-50 p-6 rounded-lg w-full overflow-auto mt-4"
        >
          {selectedTab === "orders" && (
            <div>
              {customerRequests.map((request) => (
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
                />
              ))}
            </div>
          )}

          {selectedTab === "manage-services" && (
            <div>
              {customerRequests.map((request) => (
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
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRequestCustomer;
