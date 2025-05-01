import React from 'react';
import { Card, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import '../LostPetsForm/LostPetsForm.css'; // Reutilizamos los mismos estilos

const LostPetsList = () => {
  // Datos hardcodeados de mascotas perdidas
  const lostPets = [
    {
      id: 1,
      name: "Toby",
      type: "Perro",
      breed: "Golden Retriever",
      age: 3,
      gender: "Macho",
      description: "Golden de tamaño mediano con collar azul. Tiene un lunar cerca del ojo derecho.",
      photo: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300",
      lostDate: "2023-05-15",
      lostTime: "15:30",
      location: "Parque La Carolina, cerca de la fuente",
      contactName: "María González",
      contactPhone: "0991234567",
      district: "La Carolina, Quito"
    },
    {
      id: 2,
      name: "Luna",
      type: "Gato",
      breed: "Siamés",
      age: 2,
      gender: "Hembra",
      description: "Gata siamesa con ojos azules. Tiene un cascabel rojo.",
      photo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300",
      lostDate: "2023-05-18",
      lostTime: "08:00",
      location: "Calle Guayas y Amazonas",
      contactName: "Carlos Méndez",
      contactPhone: "0987654321",
      district: "Centro Histórico, Quito"
    },
    {
      id: 3,
      name: "Rocky",
      type: "Perro",
      breed: "Bulldog Francés",
      age: 4,
      gender: "Macho",
      description: "Bulldog francés gris con manchas blancas. Usa arnés negro.",
      photo: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=300",
      lostDate: "2023-05-20",
      lostTime: "19:45",
      location: "Av. 6 de Diciembre y Whymper",
      contactName: "Andrea Pazmiño",
      contactPhone: "0976543210",
      district: "La Floresta, Quito"
    }
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="lost-pet-card">
            <Card.Header className="lost-pet-header">
              <h2 className="mb-0">Mascotas Perdidas Reportadas</h2>
            </Card.Header>
            <Card.Body>
              {lostPets.length === 0 ? (
                <div className="text-center py-4">
                  <h4>No hay mascotas perdidas reportadas actualmente</h4>
                  <p>Si has perdido a tu mascota, por favor repórtala usando el formulario.</p>
                </div>
              ) : (
                <Row>
                  {lostPets.map(pet => (
                   <Col md={6} className="mb-4" key={pet.id}>
                   <Card className="h-100"> 
                     <Row className="g-0 h-100"> 
                       <Col md={5} className="d-flex"> 
                         <Card.Img 
                           variant="top" 
                           src={pet.photo} 
                           alt={pet.name}
                           className="img-fluid w-100" 
                           style={{
                             objectFit: 'cover',
                             height: '100%', 
                             minHeight: '200px' 
                           }}
                         />
                       </Col>
                       <Col md={7} className="d-flex flex-column"> 
                         <Card.Body className="d-flex flex-column h-100">
                           <div> 
                             <Card.Title className="d-flex align-items-center">
                               {pet.name} 
                               <Badge bg="danger" className="ms-2">Perdido</Badge>
                             </Card.Title>
                             <Card.Text>
                               <strong>Especie:</strong> {pet.type} ({pet.breed})<br />
                               <strong>Edad:</strong> {pet.age} años<br />
                               <strong>Sexo:</strong> {pet.gender}<br />
                               <strong>Perdido el:</strong> {new Date(pet.lostDate).toLocaleDateString()} a las {pet.lostTime}<br />
                               <strong>Último lugar visto:</strong> {pet.location}<br />
                               <strong>Barrio:</strong> {pet.district}
                             </Card.Text>
                           </div>
                           
                           <div className="mt-auto">
                             <Button 
                               variant="outline-danger" 
                               size="sm" 
                               className="me-2"
                             >
                               Más detalles
                             </Button>
                             <Button 
                               variant="outline-success" 
                               size="sm"
                             >
                               ¡La vi!
                             </Button>
                           </div>
                         </Card.Body>
                       </Col>
                     </Row>
                   </Card>
                 </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LostPetsList;