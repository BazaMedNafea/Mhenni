import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/layout";

import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ChooseType from "./pages/ChooseType";
import UserForm from "./pages/UserForm";
import UserProfilePage from "./pages/UserProfilePage";

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
      <Route path='/complete-registration' element={<UserForm />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
