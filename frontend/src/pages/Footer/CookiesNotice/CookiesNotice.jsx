import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CookiesNotice.css";

const CookiesNotice = () => {
  // Fuerza el scroll al top al montar el componente
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    return (
        <section className="privacy-section">
        <Container>
            <Row className="justify-content-center">
            <Col lg={10}>
                <div className="privacy-container">
                <div className="privacy-block">
                <h2 className="privacy-title">AVISO DE COOKIES</h2>
                <p className="privacy-text mt-4">
                    Última actualización: mayo de 2025.
                </p>
                <p className="privacy-text">
                    Gracias por visitar nuestro sitio web ("Sitio web"). Este Aviso de Cookies (en adelante, el “Aviso”) se aplica al uso de los servicios provistos a través del Sitio Web por <strong>Mi Hogar.</strong> <br />
                    Al utilizar nuestro Sitio Web, usted acepta el uso de cookies y tecnologías similares conforme a lo descrito en este Aviso. Si no está de acuerdo con el uso de cookies, puede configurar su navegador para rechazarlas o evitar el uso de nuestro Sitio Web. Tenga en cuenta que deshabilitar cookies puede afectar su experiencia en el sitio.
                </p>

                <h5 className="privacy-subtitle">¿Qué son las cookies?</h5>
                <p className="privacy-text">
                    Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo para almacenar datos que pueden ser actualizados y recuperados por el sitio web que los instaló. Se usan para facilitar y mejorar la navegación y personalizar la experiencia del usuario.
                </p>

                <h5 className="privacy-subtitle">¿Por qué usamos cookies?</h5>
                <p className="privacy-text">
                    Usamos cookies para optimizar la funcionalidad del sitio, comprender cómo los visitantes utilizan nuestros servicios y personalizar contenido. No recopilamos información personal directa, pero podemos vincular cookies con datos personales que usted proporcione a través del sitio.
                </p>

                <h5 className="privacy-subtitle">Tipos de cookies que utilizamos:</h5>
                <p className="privacy-text">
                    - Estrictamente necesarias: imprescindibles para la navegación y correcto funcionamiento del sitio, como mantener la sesión activa o controlar la seguridad. No pueden desactivarse sin afectar el servicio.
                    - De configuración: recuerdan sus preferencias, para que su experiencia sea personalizada.
                    - Analíticas o de medición: permiten analizar cómo se usa el sitio para mejorar su diseño y funcionalidad, mediante datos anónimos y agregados.
                    - De publicidad comportamental: almacenan información sobre sus hábitos de navegación para mostrar anuncios y contenido personalizados según sus intereses.
                    - De localización geográfica: ayudan a mostrar contenidos o publicidad relevante según su ubicación.
                </p>

                <h5 className="privacy-subtitle">Cookies específicas que usamos en MI HOGAR:</h5>
                <p className="privacy-text">
                    - Google Analytics: cookies técnicas y analíticas para medir el tráfico y mejorar la experiencia. <br />
                    - Cookies de sesión: cookies esenciales para mantener su sesión activa y guardar preferencias temporales mientras navega.
                </p>

                <h5 className="privacy-subtitle">Consentimiento y revocación</h5>
                <p className="privacy-text">
                    Solo utilizamos cookies tras obtener su consentimiento a través del banner o aviso de cookies. Usted puede aceptar o rechazar el uso de cookies y modificar esta decisión en cualquier momento.
                </p>

                <h5 className="privacy-subtitle">¿Cómo cambiar la configuración de cookies?</h5>
                <p className="privacy-text">
                    Puede gestionar y eliminar cookies desde la configuración de su navegador. Tenga en cuenta que si deshabilita cookies, algunas funciones del sitio pueden no estar disponibles o no funcionar correctamente. Los cambios que realice en la configuración de cookies se mantendrán hasta que los modifique nuevamente. <br />
                    Para más información, puede consultar esta página en cualquier momento desde el enlace “Política de Cookies” en el pie de página del sitio.
                </p>
            </div>
            </div>
            </Col>
        </Row>
        </Container>
    </section>
    );
};

export default CookiesNotice;
