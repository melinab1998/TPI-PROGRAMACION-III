import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Layout from "./layout/Layout/Layout"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import Pets from "./pages/Meet/Pets/Pets";
import NotFound from "./pages/NotFound/NotFound";
import Donation from "./pages/Donation/Donation";
import AdoptionForm from "./pages/AdoptionForm/AdoptionForm";
import PetDetails from "./pages/Meet/PetDetails/PetDetails";

function App() {

  const location = useLocation();
  document.body.className = location.pathname === "/register" ? "custom-register" : "default-body";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meet" element={<Pets />} />
        <Route path="/pets/:id" 
        element={<PetDetails/>}  
      />
        <Route path="/donation" element={<Donation/>} />
        <Route path="/adoption-form" element={<AdoptionForm/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
