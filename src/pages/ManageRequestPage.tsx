import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestCard from "@/components/RquestCard";
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
        <TabsList className="flex justify-between">
          <TabsTrigger
            value="orders"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="manage-services"
            className="flex-1 flex items-center justify-center px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            Manage Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="orders"
          className="h-full bg-gray-50 p-10 rounded-lg w-full overflow-auto"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {providerRequests?.map((request) => (
                <RequestCard
                  key={request.id}
                  requestId={request.id}
                  customerName={`${request.customer.user.firstName} ${request.customer.user.lastName}`}
                  customerAddress={request.customerAddress}
                  serviceName={request.service.service_name}
                  requestDescription={
                    request.requirement_desc || "No description provided"
                  }
                  expectedStartTime={request.expected_start_time}
                  customerProfileImage={request.customer.user.image}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRequestPage;
