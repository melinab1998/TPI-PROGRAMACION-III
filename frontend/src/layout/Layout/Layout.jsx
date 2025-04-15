import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importamos useLocation
import NavBar from '../../components/NavBar/NavBar';
import Login from '../../components/Login/Login';

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual

  // Verificamos si estamos en la ruta '/register' y si es así, no mostramos el NavBar
  const hideNav = location.pathname === '/register';

  return (
    <>
      {/* Solo mostramos el NavBar si la ruta no es '/register' */}
      {!hideNav && <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />}
      
      {/* Renderiza el contenido de la ruta */}
      <Outlet />

      {/*<Footer />*/}

      {/* Mostrar el Login en cualquier ruta */}
      <Login showLogin={showLogin} />
    </>
  );
};

export default Layout;
