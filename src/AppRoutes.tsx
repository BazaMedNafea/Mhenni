import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import Layout from "./layouts/layout";
import CustomerProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ChooseType from "./pages/ChooseType";
import CompleteRegistration from "./pages/CompleteRegistration";
import SearchPage from "./pages/SearchPage";
import ServiceProviderPage from "./pages/ProviderProfile";
import DemandServicePage from "./pages/DemandServicePage";
import ManageRequestProvider from "./pages/ManageRequestProvider";
import ManageServicesPage from "./pages/ManageServicePage";
import WelcomePage from "./pages/WelcomePage";
import OrderStatusPage from "./pages/OrderStatusPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ManageRequestCustomer from "./pages/ManageRequestCustomer";
import AboutUs from "./pages/AboutUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          
            <HomePage />
      
        }
      />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/choose-type" element={<ChooseType />} />
      <Route
        path="/manage-services"
        element={
          <Layout>
            <ManageServicesPage />
          </Layout>
        }
      />
      <Route path="/complete-registration" element={<CompleteRegistration />} />
      <Route
        path="/search"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route path="/about-us" element={<AboutUs />} />

      {/* Route for OrderStatusPage */}
      <Route
        path="/orders/:orderId"
        element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        }
      />

      <Route
        path="/orders/:orderId"
        element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        }
      />
      <Route
        path="/service-details/:id"
        element={
          <Layout>
            <ServiceDetailsPage />
          </Layout>
        }
      />
      {/* Add route for the service provider page */}
      <Route
        path="/provider/:providerId"
        element={
          <Layout>
            <ServiceProviderPage />
          </Layout>
        }
      />
      <Route
        path="/manage-requests-provider"
        element={
          <Layout>
            <ManageRequestProvider />
          </Layout>
        }
      />
      <Route
        path="/manage-requests-customer"
        element={
          <Layout>
            <ManageRequestCustomer />
          </Layout>
        }
      />
      {/* Add route for the demand service page */}
      <Route
        path="/demand-service/:providerId"
        element={
          <Layout>
            <DemandServicePage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={
            <Layout>
              <CustomerProfilePage />
            </Layout>
          }
        />
      </Route>

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
