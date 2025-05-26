import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Layout from "./layout/Layout/Layout"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import Pets from "./pages/Meet/Pets/Pets";
import NotFound from "./pages/NotFound/NotFound";
import Donation from "./pages/Donation/Donation";
import AdoptionForm from "./pages/AdoptionForm/AdoptionForm"
import PetDetails from "./pages/Meet/PetDetails/PetDetails";
import Login from "./components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileApp from "./pages/Footer/MobileApp/MobileApp.jsx"
import AdminDashboard from "./components/AdminComponents/AdminDashboard/AdminDashboard"
import './utils/notifications.css';
import { AuthenticationContext } from "../../frontend/src/services/auth/AuthContext"
import PetsManagement from "./components/AdminComponents/PetsManagement/PetsManagement";
import RequestsManagement from "./components/AdminComponents/RequestsManagement/RequestsManagement";
import TermsAndConditions from "./pages/Footer/TermsAndConditions/TermsAndConditions.jsx"
import PrivacyNotice from "./pages/Footer/PrivacyNotice/PrivacyNotice.jsx"
import CookiesNotice from "./pages/Footer/CookiesNotice/CookiesNotice.jsx"
import SuperAdminDashboard from "./components/SuperAdminComponents/SuperAdminDashboard/SuperAdminDashboard";
import UsersManagement from "./components/SuperAdminComponents/UsersManagement/UsersManagement";
import SheltersManagement from "./components/SuperAdminComponents/SheltersManagement/SheltersManagement";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { userRole } = useContext(AuthenticationContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showLogin) {
      setShowLogin(true);
      window.history.replaceState({}, document.title);
    }
    document.body.className = location.pathname === "/register" ? "custom-register" : "default-body";
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              userRole === "superadmin" ? <SuperAdminDashboard />
              : userRole === "admin" ? <AdminDashboard />
              : <Home />
            }
          />
          <Route path="contact" element={<Contact />} />
          <Route path="pets" element={<Pets />} />
          <Route path="pets/:id" element={<PetDetails />} />
          <Route path="donation" element={<Donation />} />
          <Route path="app-movil" element={<MobileApp />} />
          <Route path="privacy-notice" element={<PrivacyNotice />} />
          <Route path="cookies-notice" element={<CookiesNotice />} />
          <Route path="terms-conditions" element={<TermsAndConditions />} />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="adoption/:id" element={<AdoptionForm />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}>
            <Route path="petsmanagement" element={<PetsManagement />} />
            <Route path="requestsmanagement" element={<RequestsManagement />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route path="usersmanagement" element={<UsersManagement />} />
            <Route path="sheltersmanagement" element={<SheltersManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/register" element={<Register />} />
      </Routes>

      <Login showLogin={showLogin} toggleLogin={() => setShowLogin(false)} />
      <ToastContainer />
    </>
  );
}

export default App;