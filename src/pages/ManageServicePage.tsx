import { Tabs, TabsContent } from "@/components/ui/tabs";
import RequestCard from "@/components/ProviderRequestCard";
import { useGetProviderRequests } from "@/api/MyProviderApi";

const ManageRequestPage = () => {
  const { providerRequests, isLoading } = useGetProviderRequests();
  const handleAccept = (requestId: number) => {
    console.log(`Accepted request ${requestId}`);
    // Implement your logic for accepting the request here
  };

  const handleReject = (requestId: number) => {
    console.log(`Rejected request ${requestId}`);
    // Implement your logic for rejecting the request here
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="orders" className="flex-grow">
        {/* ... */}

        <TabsContent
          value="orders"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {providerRequests?.map((request) => {
                const customAddress = `${request.custom_address_street}, ${request.custom_address_city}, ${request.custom_address_wilaya}, ${request.custom_address_zip}`;
                return (
                  <RequestCard
                    key={request.id}
                    requestId={request.id}
                    customerName={`${request.customer.user.firstName} ${request.customer.user.lastName}`}
                    customerAddress={customAddress}
                    serviceName={request.service.service_name}
                    requestDescription={
                      request.requirement_desc || "No description provided"
                    }
                    expectedStartTime={request.expected_start_time}
                    customerProfileImage={request.customer.user.image}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    state={""}
                  />
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRequestPage;
