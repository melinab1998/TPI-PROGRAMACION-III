import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav>
                <div>
                    <img href="../../img/Logo-MiHogar.png" alt="Logo" />
                </div>
                <div>
                    <button>Inicio</button>
                    <button>Nosotros</button>
                    <button>Adopción</button>
                    <button>Mascotas Perdidas</button>
                    <button>Contacto</button>
                </div>
                <div>
                    <button>Iniciar Sesión</button>
                    <button>Registrarse</button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
