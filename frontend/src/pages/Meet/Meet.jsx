import React from 'react';
import './Meet.css';
import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import gatoFilter from '../../img/gato-filter.png';
import perroFilter from '../../img/perro-filter.png';
import ambosFilter from '../../img/ambos-filter.png';

const pets = [
  { id: 1, name: 'Michi', type: 'gato', age: 1, race: 'Desconocida', description: 'Dulce y dormilona, perfecta para una vida tranquila.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdAuQr8svvu1MbMWsR2m4Ewtpdj2qLHXWWhA&s' },
  { id: 2, name: 'Firulais', type: 'perro', age: 1, race: 'Desconocida', description: ' Juguetón y muy leal, ideal para familias activas.', img: 'https://www.lanacion.com.ar/resizer/v2/el-interrogante-requiere-de-un-nuevo-orden-FHNNVHNWPNHJXBGQMNPDEULCPU.jpg?auth=9ff82c664787a5ef88400b2131451663992638ce3463a45806be23b0f7a7dae7&width=880&height=586&quality=70&smart=true' },
  { id: 3, name: 'Bigotes', type: 'gato', age: 5, race: 'Desconocida', description: 'Curioso y simpático, siempre está buscando mimos.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV4ViXIUoEDKW539EcxA19WNaGkiKuiFWu8A&s' },
  { id: 4, name: 'Rocky', type: 'perro', age: 6, race: 'Desconocida', description: 'Energético y obediente, siempre listo para una caminata.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5EiaCiydl3CZ863HK2J5D99ZnDpkY8P7pmA&s' },
];

const Meet = () => {
  const [filter, setFilter] = useState('all')

  const filteredPets = pets.filter((p)=>{
    if(filter === 'all') return true;
    return p.type === filter;
  });

  return (
  <Container>
    <h2 className="py-10 title">Mascotas en Adopción</h2>
    <div className="d-flex justify-start mb-10 gap-4 flex-wrap">
      <Button onClick={() => setFilter('all')} className="w-35 button">
        <img src={ambosFilter} alt="" width={35} />
        Todos
      </Button>
      <Button onClick={() => setFilter('gato')} className="w-35 button">
        <img src={gatoFilter} alt="" width={30}  />
        Gatos
      </Button>
      <Button onClick={() => setFilter('perro')} className="w-35 button">
        <img src={perroFilter} alt="" width={30} />
        Perros
      </Button>
    </div>

    <Row>
      {filteredPets.map((p) => (
        <Col key={p.id} xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Card className="w-full h-full">
            <Card.Img variant="top" src={p.img} className="object-cover h-64 w-full" />
            <Card.Body>
              <Card.Title className="name">{p.name}</Card.Title>
              <Card.Text className="text">
                <div>Edad: {p.age}</div>
                <div>Raza: {p.race}</div>
                <div>Descripción: {p.description}</div>
              </Card.Text>
              <Button className="button">Solicitar adopción</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
}


export default Meet