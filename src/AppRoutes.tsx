import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import Layout from "./layouts/layout";
import CustomerProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ChooseType from "./pages/ChooseType";
import CompleteRegistration from "./pages/CompleteRegistration";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/choose-type' element={<ChooseType />} />
      <Route path='/complete-registration' element={<CompleteRegistration />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/customer-profile'
          element={
            <Layout>
              <CustomerProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
