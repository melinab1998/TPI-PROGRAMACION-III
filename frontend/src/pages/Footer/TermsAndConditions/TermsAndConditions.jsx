import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./TermsAndConditions.css";


const TermsAndConditions = () => {
    // Fuerza el scroll al top al montar el componente
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    return (
        <section className="terms-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                    <div className="terms-container">
                        <div className="terms-section">
                        <div className="terms-block">
                            <h2 className="terms-title">TÉRMINOS Y CONDICIONES DE USO DEL SITIO “MI HOGAR”</h2>
                            <p className="terms-text mt-4">
                                Última actualización: mayo de 2025.
                            </p>
                            <p className="terms-text">
                                Bienvenido al sitio web de <strong>Mi Hogar</strong>. Este sitio ha sido desarrollado para brindar a los usuarios información sobre nuestras actividades, servicios, iniciativas solidarias, así como permitir su participación en acciones como donaciones y adopciones. <br />
                                Por favor, lea atentamente estos términos y condiciones de uso. Al acceder a este sitio, usted acepta sin restricciones los siguientes términos y condiciones. Si no está de acuerdo con ellos, le solicitamos que no utilice el sitio.
                            </p>

                            <h5 className="terms-subtitle">1. Aceptación de los Términos</h5>
                            <p className="terms-text">
                                Al ingresar y utilizar este sitio, usted declara haber leído, comprendido y aceptado estos Términos y Condiciones en su totalidad. Nos reservamos el derecho de modificar estos términos en cualquier momento y sin previo aviso. Le recomendamos revisar esta sección periódicamente.
                            </p>

                            <h5 className="terms-subtitle">2. Titularidad del sitio</h5>
                            <p className="terms-text">
                                El sitio <strong>Mi Hogar</strong> es operado y administrado por Mi Hogar S.A. Todo el contenido del sitio, incluyendo textos, imágenes, gráficos, logotipos, marcas, diseños, estructura y software, pertenece a “Mi Hogar” o a sus respectivos autores, colaboradores o socios, y se encuentra protegido por las leyes de propiedad intelectual vigentes.
                            </p>

                            <h5 className="terms-subtitle">3. Uso permitido</h5>
                            <p className="terms-text">
                                El contenido de este sitio puede ser utilizado únicamente con fines personales, informativos y no comerciales. No está permitido modificar, copiar, reproducir, publicar, distribuir o explotar de ninguna manera el contenido del sitio sin la autorización previa y por escrito de “Mi Hogar”.
                            </p>

                            <h5 className="terms-subtitle">4. Participación del usuario</h5>
                            <p className="terms-text">
                                Algunas secciones del sitio permiten que los usuarios interactúen (por ejemplo, a través de formularios de adopción, contacto o donaciones). Al enviar información, usted declara que:<br />
                                - La información proporcionada es veraz y precisa.<br />
                                - No incluirá contenido ofensivo, difamatorio, ilegal o que infrinja derechos de terceros.<br />
                                - No usará el sitio para fines indebidos, fraudulentos o ilícitos.<br />
                                “Mi Hogar” se reserva el derecho de moderar, editar o eliminar cualquier contenido o formulario enviado que considere inapropiado.
                            </p>

                            <h5 className="terms-subtitle">5. Política de privacidad</h5>
                            <p className="terms-text">
                                La información personal que el usuario proporcione será tratada con confidencialidad y de acuerdo con nuestra política de privacidad. No compartiremos sus datos con terceros sin su consentimiento, excepto cuando la ley lo requiera o para prestar correctamente los servicios ofrecidos en el sitio.
                            </p>

                            <h5 className="terms-subtitle">6. Responsabilidad</h5>
                            <p className="terms-text">
                                Aunque nos esforzamos por mantener la información actualizada y precisa, “Mi Hogar” no garantiza la exactitud, integridad ni vigencia de los contenidos del sitio. El uso de la información contenida en este sitio es bajo responsabilidad exclusiva del usuario. <br />
                                No nos responsabilizamos por:<br />
                                - Daños derivados del uso o imposibilidad de uso del sitio.<br />
                                - Errores técnicos, interrupciones del servicio, virus o cualquier otro problema que pueda surgir del uso de este sitio o sitios vinculados.
                            </p>

                            <h5 className="terms-subtitle">7. Enlaces a otros sitios</h5>
                            <p className="terms-text">
                                El sitio puede contener enlaces a páginas de terceros. Estos enlaces se proporcionan únicamente para su conveniencia. “Mi Hogar” no controla ni se responsabiliza por el contenido, políticas de privacidad o prácticas de estos sitios externos.
                            </p>

                            <h5 className="terms-subtitle">8. Modificaciones al sitio</h5>
                            <p className="terms-text">
                                “Mi Hogar” se reserva el derecho de modificar, suspender o eliminar parcial o totalmente el contenido del sitio en cualquier momento, sin necesidad de aviso previo.
                            </p>

                            <h5 className="terms-subtitle">9. Jurisdicción y legislación aplicable</h5>
                            <p className="terms-text">
                                Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante cualquier conflicto relacionado con el uso del sitio, las partes se someterán a los tribunales ordinarios con jurisdicción en la ciudad de Rosario, provincia de Santa Fe, renunciando a cualquier otro fuero o jurisdicción que pudiera corresponderles.
                            </p>

                            <h5 className="terms-subtitle">10. Contacto</h5>
                            <p className="terms-text">
                                Para consultas relacionadas con estos términos y condiciones, puede contactarnos a través del formulario de contacto del sitio.
                            </p>
                        </div>
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TermsAndConditions;
