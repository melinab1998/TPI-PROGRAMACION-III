import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PrivacyNotice.css";

const PrivacyNotice = () => {
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
                <h2 className="privacy-title">AVISO DE PRIVACIDAD</h2>
                <p className="privacy-text mt-4">
                    Última actualización: mayo de 2025.
                </p>
                <p className="privacy-text">
                    En <strong>Mi Hogar</strong> valoramos la privacidad de nuestros usuarios. Lea este Aviso de Privacidad (en adelante el “Aviso”) detenidamente para comprender nuestras políticas y prácticas con respecto a sus Datos Personales y cómo los tratamos. <br />
                    El presente Aviso se aplica a la utilización de los servicios provistos a través del sitio web Mi Hogar (en adelante, el “Sitio Web”), destinado a la adopción de mascotas, publicación de mascotas perdidas o encontradas, realización de donaciones y comunicación a través de un formulario de contacto (en adelante, los “Servicios”). <br />
                    Este Aviso explica cómo sus datos personales son recolectados, usados y protegidos por Mi Hogar (en adelante, “Nosotros” o “el Sitio”). También le explica cómo usted puede acceder, actualizar sus Datos Personales y ejercer ciertos derechos sobre ellos. Este Aviso cubre nuestras actividades de recopilación de datos en línea y fuera de línea, incluidos los datos personales que recopilamos a través de nuestros canales digitales.<br />
                    Al proporcionar sus datos personales a través de nuestro Sitio Web o cualquiera de nuestros Servicios, usted otorga su consentimiento libre, expreso, informado e inequívoco para el tratamiento de sus datos en los términos aquí descritos.<br />
                    Le recomendamos consultar este Aviso periódicamente para verificar si se han realizado modificaciones o actualizaciones.
                </p>

                <h5 className="privacy-subtitle">1. Fuentes de datos personales</h5>
                <p className="privacy-text">
                    Este Aviso se aplica a los datos personales que recopilamos de usted o sobre usted, a través de: <br />
                    - Formularios de contacto, adopción, donación y publicación de mascotas perdidas/encontradas en el Sitio Web.<br />
                    - Comunicaciones electrónicas (correo electrónico, mensajes) y telefónicas.<br />
                    - Interacciones en redes sociales vinculadas al Sitio Web.
                    Datos que usted voluntariamente nos proporciona en eventos o actividades organizadas por Nosotros.
                </p>

                <h5 className="privacy-subtitle">2. Datos personales que recopilamos</h5>
                <p className="privacy-text">
                    Recopilamos diversos tipos de información personal que usted nos proporciona directamente, tales como: <br />
                    - Información de contacto: nombre, dirección de correo electrónico, número telefónico, domicilio.<br />
                    - Información relacionada con mascotas: datos para adopción, reporte de mascotas perdidas/encontradas (características, fotografías, ubicación).<br />
                    - Información de pagos: datos necesarios para procesar donaciones (datos de tarjeta, cuentas, etc.), siempre manejados con protocolos seguros.<br />
                    - Información demográfica y datos adicionales que usted comparta voluntariamente.<br />
                    - Datos técnicos: dirección IP, tipo de navegador, cookies y otras tecnologías para mejorar la experiencia en el Sitio.<br />
                    - No solicitamos ni recolectamos datos personales de menores de edad sin el consentimiento explícito de sus padres o tutores.
                </p>

                <h5 className="privacy-subtitle">3. Usos de sus datos personales</h5>
                <p className="privacy-text">
                    Utilizamos sus datos personales para: <br />
                    - Gestionar su solicitud de adopción, publicación o donación.<br />
                    - Responder a sus consultas y solicitudes a través de formularios de contacto.<br />
                    - Procesar y registrar las donaciones realizadas a través del Sitio.<br />
                    - Mejorar la experiencia de usuario y la funcionalidad del Sitio Web.<br />
                    - Comunicarnos con usted para informar novedades, cambios en los Servicios o responder a requerimientos.<br />
                    - Cumplir con obligaciones legales y proteger la seguridad y buen funcionamiento del Sitio.
                </p>

                <h5 className="privacy-subtitle">4. Divulgacion de datos personales</h5>
                <p className="privacy-text">
                    No compartimos sus datos personales con terceros sin su consentimiento, salvo cuando sea necesario para cumplir con obligaciones legales, procesar donaciones o prestar servicios en el marco de nuestros Servicios con proveedores confiables.
                </p>

                <h5 className="privacy-subtitle">5. Derechos del usuario</h5>
                <p className="privacy-text">
                    Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales, así como a solicitar su eliminación o portabilidad conforme a la legislación vigente.
                </p>

                <h5 className="privacy-subtitle">6. Cookies y tecnologías similares</h5>
                <p className="privacy-text">
                    Utilizamos cookies y tecnologias similares para mejorar la navegación y analizar el uso del sitio. Puede configurar su navegador para rechazarlas o recibir alertas sobre su uso, aunque algunas funciones podrían verse limitadas.
                </p>

                <h5 className="privacy-subtitle">7. Conservación de datos</h5>
                <p className="privacy-text">
                    Conservamos sus datos personales solo durante el tiempo necesario para cumplir con los fines para los cuales fueron recolectados o para cumplir con obligaciones legales.
                </p>

                <h5 className="privacy-subtitle">8. Seguridad</h5>
                <p className="privacy-text">
                    Implementamos medidas técnicas y organizativas razonables para proteger sus datos personales contra pérdida, mal uso, acceso no autorizado, divulgación, alteración o destrucción.
                </p>

                <h5 className="privacy-subtitle">9. Cambios en el aviso de privacidad</h5>
                <p className="privacy-text">
                    Nos reservamos el derecho de modificar este aviso en cualquier momento. Cualquier cambio será publicado en esta sección con la fecha de actualización. Le invitamos a revisarlo periódicamente para mantenerse informado sobre cómo protegemos sus datos.
                </p>

                <h5 className="privacy-subtitle">10. Contacto</h5>
                <p className="privacy-text">
                    Para ejercer sus derechos o hacer consultas relacionadas con la privacidad, puede contactarnos a través del formulario de contacto disponible en el sitio.
                </p>
                </div>
                </div>
            </Col>
        </Row>
        </Container>
    </section>
    );
};

export default PrivacyNotice;
