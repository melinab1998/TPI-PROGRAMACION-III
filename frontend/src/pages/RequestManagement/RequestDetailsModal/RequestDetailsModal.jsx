import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RequestDetailsModal = ({ show, onHide, request }) => {
  if (!request) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {request.name}</p>
        <p><strong>Apellido:</strong> {request.lastname}</p>
        <p><strong>Ciudad:</strong> {request.city}</p>
        <p><strong>Provincia:</strong> {request.province}</p>
        <p><strong>Dirección:</strong> {request.address}</p>
        <p><strong>Teléfono:</strong> {request.phone}</p>
        <p><strong>DNI:</strong> {request.dni}</p>
        <p><strong>Mascota:</strong> {request.petName}</p>
        <p><strong>Refugio:</strong> {request.shelterName}</p>
        <p><strong>Motivo de adopción:</strong> {request.reason}</p>
        <p><strong>¿Tiene patio?:</strong> {request.hasCourtyard}</p>
        <p><strong>¿Tiene otras mascotas?:</strong> {request.hasPets}</p>
        <p><strong>¿Las mascotas están castradas?:</strong> {request.petsNeutered}</p>
        <p><strong>Plan de vacaciones:</strong> {request.vacationPlan}</p>
        <p><strong>Plan de mudanza:</strong> {request.movingPlan}</p>
        <p><strong>Paseos diarios:</strong> {request.dailyWalks}</p>
        <p><strong>Seguimiento por WhatsApp:</strong> {request.whatsappFollowUp}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestDetailsModal;