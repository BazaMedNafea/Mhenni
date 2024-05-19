import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import Layout from "./layouts/layout";
import CustomerProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ChooseType from "./pages/ChooseType";
import CompleteRegistration from "./pages/CompleteRegistration";
import SearchPage from "./pages/SearchPage";
import ServiceProviderPage from "./pages/ServiceProviderPage";
import DemandServicePage from "./pages/DemandServicePage";
import ManageRequestPage from "./pages/ManageRequestPage";
import ManageServicesPage from "./pages/ManageServicePage";
import WelcomePage from "./pages/WelcomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
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
        path="/manage-requests"
        element={
          <Layout>
            <ManageRequestPage />
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
