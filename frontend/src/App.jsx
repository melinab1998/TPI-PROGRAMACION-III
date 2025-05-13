import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import './utils/notifications.css'
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PetManagement from "./pages/PetManagement/PetManagement/PetManagement";
import RequestManagement from "./pages/RequestManagement/RequestManagement";

function App() {

const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.showLogin) {
      setShowLogin(true);
      // Limpia el estado para evitar que se vuelva a abrir si se recarga
      window.history.replaceState({}, document.title);
    }
  
    document.body.className = location.pathname === "/register" ? "custom-register" : "default-body";
  }, [location]);

const mockRequests = [
  {
    id: 1,
    name: "Juan",
    lastname: "Pérez",
    address: "Calle Falsa 123",
    city: "Córdoba",
    province: "Córdoba",
    phone: "3511234567",
    dni: "30123456",
    housingType: "Casa",
    ownershipStatus: "owner",
    ownerConsultation: "",
    hasCourtyard: "yes",
    hasPets: "yes",
    petsNeutered: "yes",
    hadOtherPets: "yes",
    reason: "Me encantan los animales y quiero dar un hogar.",
    vacationPlan: "Lo llevaría conmigo o lo dejaría con familia.",
    movingPlan: "No tengo planes de mudanza.",
    dailyWalks: "Dos veces al día.",
    whatsappFollowUp: "yes",
    termsAccepted: true,
    petName: "Luna",
    shelterName: "Refugio Patitas Felices",
    status: "pending",
  },
  {
    id: 2,
    name: "María",
    lastname: "Gómez",
    address: "Av. Siempreviva 742",
    city: "Rosario",
    province: "Santa Fe",
    phone: "3417654321",
    dni: "28987654",
    housingType: "Departamento",
    ownershipStatus: "tenant",
    ownerConsultation: "Sí, ya consulté y me permiten tener mascotas.",
    hasCourtyard: "no",
    hasPets: "no",
    petsNeutered: "",
    hadOtherPets: "no",
    reason: "Quiero un compañero para mi hijo.",
    vacationPlan: "Lo dejaría con un familiar de confianza.",
    movingPlan: "Podría mudarme el próximo año.",
    dailyWalks: "Una vez por la tarde.",
    whatsappFollowUp: "no",
    termsAccepted: true,
    petName: "Firulais",
    shelterName: "Huellas del Alma",
    status: "approved",
  }
];


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/petmanagement" element={<PetManagement/>}/>
          <Route path="/requestmanagement" element={<RequestManagement requests={mockRequests} />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/lostform" element={<LostPetsForm />} />
          <Route path="/lostlist" element={<LostPetsList />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/adoption/:id" element={<AdoptionForm />} />
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
