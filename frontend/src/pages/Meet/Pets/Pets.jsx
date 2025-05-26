import { useState, useEffect } from 'react';
import './Pets.css';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import gatoFilter from '../../../img/gato-filter.png';
import perroFilter from '../../../img/perro-filter.png';
import ambosFilter from '../../../img/ambos-filter.png';
import { Link } from "react-router-dom";
import { getPets } from '../../../services/api.services.js';
import { errorToast } from '../../../utils/notifications.js';
import usePagination from '../../../hooks/usePagination';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('all');
  const petsPerPage = 9;

  useEffect(() => {
    getPets(
      (data) => {
        const disponibles = data.filter(pet => !pet.adopted);
        setPets(disponibles);
      },
      (error) => {
        errorToast(error.message || "Error al obtener mascotas");
        console.error("Error fetching pets:", error);
      }
    );
  }, []);

  const filteredPets = pets.filter((p) => {
    if (filter === 'all') return true;
    return p.species.toLowerCase() === filter;
  });

  // Hook de paginación
  const {
    currentPage,
    totalPages,
    currentData: currentPets,
    goToPage,
    setCurrentPage: setPage
  } = usePagination(filteredPets, petsPerPage);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => goToPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <h2 className="py-10 title">Mascotas en Adopción</h2>
      <div className="d-flex justify-start mb-10 gap-4 flex-wrap">
        <Button onClick={() => { setFilter('all'); setPage(1); }} className="w-35 button">
          <img src={ambosFilter} alt="" width={35} />
          Todos
        </Button>
        <Button onClick={() => { setFilter('gato'); setPage(1); }} className="w-35 button">
          <img src={gatoFilter} alt="" width={30} />
          Gatos
        </Button>
        <Button onClick={() => { setFilter('perro'); setPage(1); }} className="w-35 button">
          <img src={perroFilter} alt="" width={30} />
          Perros
        </Button>
      </div>

      <Row>
        {currentPets.map((pet) => (
          <Col key={pet.id_pet} xs={12} sm={6} md={4} className="mb-4 d-flex">
            <Card className="w-full h-full">
              <Card.Img variant="top" src={pet.image_url} className="object-cover h-64 w-full" />
              <Card.Body>
                <Card.Title className="name">{pet.name}</Card.Title>
                <Card.Text className="text"><b>Especie: </b> {pet.species}</Card.Text>
                <Card.Text className="text"><b>Raza: </b>{pet.race}</Card.Text>
                <Card.Text className="text">
                  <b>Edad: </b> {pet.age} {pet.age === 1 ? 'año' : 'años'}
                </Card.Text>
                <Link to={`/pets/${pet.id_pet}`}><Button className="button-details">Conocer más</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="mt-4 justify-content-center">{paginationItems}</Pagination>
    </Container>
  );
}

export default Pets;