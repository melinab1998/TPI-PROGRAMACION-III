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
import LostPetsForm from "./pages/LostPets/LostPetsForm/LostPetsForm";
import LostPetsList from "./pages/LostPets/LostPetsList/LostPetsList";
import Login from "./components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileApp from "./pages/MobileApp/MobileApp";
import AdminDashboard from "./components/AdminComponents/AdminDashboard/AdminDashboard"
import './utils/notifications.css';
import { AuthenticationContext } from "../../frontend/src/services/auth/AuthContext"
import PetsManagement from "./components/AdminComponents/PetsManagement/PetsManagement";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import PrivacyNotice from "./pages/PrivacyNotice/PrivacyNotice";
import CookiesNotice from "./pages/CookiesNotice/CookiesNotice";
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
      // Limpia el estado para evitar que se vuelva a abrir si se recarga
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
              userRole === "superadmin"
                ? <SuperAdminDashboard />
                : userRole === "admin"
                  ? <AdminDashboard />
                  : <Home />
            } />
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/lostform" element={<LostPetsForm />} />
          <Route path="/lostlist" element={<LostPetsList />} />
          <Route path="/donation" element={<Donation />} />
          <Route
            path="/adoption/:id"
            element={
              <ProtectedRoute>
                <AdoptionForm />
              </ProtectedRoute>
            }
          />
          <Route path="/app-movil" element={<MobileApp />} />
          <Route path="/privacy-notice" element={<PrivacyNotice />} />
          <Route path="/cookies-notice" element={<CookiesNotice />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route
            path="/petsmanagement"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PetsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usersmanagement"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <UsersManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sheltersmanagement"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SheltersManagement />
              </ProtectedRoute>
            }
          />
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
