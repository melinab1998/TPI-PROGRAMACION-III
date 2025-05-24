import React, { useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaAndroid, FaApple } from "react-icons/fa";
import "./MobileApp.css";
import QrIos from "../../../img/qr-ios.png"
import QrAndroid from "../../../img/qr-android.png";
import GoogleStoreIcon from "../../../img/google-play-badge-es.png";
import AppStoreIcon from "../../../img/app-store-badge.svg";

const MobileApp = () => {
    useEffect(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }, []);

    return (
    <section className="contact-section">
        <Container className="text-center">
        <h2 className="contact-title mb-5">Descargá nuestra aplicación móvil</h2>
        <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5} className="mb-4">
            <div className="qr-block">
                <FaAndroid size={70} color="#3ddc84" />
                <p className="qr-text">
                Escaneá el código QR y descargá la versión Android
                </p>
                <img
                src={QrAndroid}
                alt="QR Android"
                className="qr-image my-3"
                />
                <p className="download-text">
                O hace click en Google Play
                </p>
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src={GoogleStoreIcon} alt="Google Play" className="store-badge" />
                </a>
            </div>
            </Col>
            <Col xs={12} md={6} lg={5} className="mb-4">
            <div className="qr-block">
                <FaApple size={70} color="#000000" />
                <p className="qr-text">
                Escaneá el código QR y descargá la versión iOS
                </p>
                <img
                src={QrIos}
                alt="QR iOS"
                className="qr-image my-3"
                />
                <p className="download-text">
                O hace click en App Store
                </p>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img src={AppStoreIcon} alt="App Store" className="store-badge" />
                </a>
            </div>
            </Col>
        </Row>
        </Container>
    </section>
    );
};

export default MobileApp;
