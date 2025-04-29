import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap';
import './PetDetails.css';
import { useParams, useNavigate } from 'react-router-dom';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/pets/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la mascota");
        }
        const data = await response.json();
        setPet(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPet();
  }, []);

  if (error) {
    return <div className="not-found">{error}</div>;
  }

  if (!pet) {
    return <div className="not-found">Cargando mascota...</div>;
  }

  return (
    <div className="container-pet-card">
      <Card className="pet-card">
        <Card.Img
          variant="top"
          src={pet.imageUrl}
          alt={`Imagen de ${pet.name}`}
          className="pet-card-img"
        />
        <Card.Body>
          <Card.Title className="pet-card-title">{pet.name}</Card.Title>
          <Card.Subtitle className="pet-card-subtitle">{pet.species}</Card.Subtitle>

          <div className="pet-card-info">
            <p><strong>Raza:</strong> {pet.race}</p>
            <p><strong>Edad:</strong> {pet.age} años</p>
            <p><strong>Peso:</strong> {pet.weight} kg</p>
            <p><strong>Género:</strong> {pet.gender}</p>
          </div>

          {pet.description && (
            <Card.Text className="pet-card-description">
              {pet.description}
            </Card.Text>
          )}

          <div className="pet-card-buttons">
            <Button
              className="btn-adopt"
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>

            <Link
              to="/adoption-form"
              className="btn-adopt"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Solicitar adopción
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetDetails;