import React from 'react';
import './Pets.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import gatoFilter from '../../../img/gato-filter.png';
import perroFilter from '../../../img/perro-filter.png';
import ambosFilter from '../../../img/ambos-filter.png';
import {Link} from "react-router-dom"
 
const Pets = () => {

  const [pets, setPets] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(()=>{

    const fetchPets = async ()=>{

      try {
        const response = await fetch("http://localhost:3000/api/pets")
        if(!response.ok){
          throw new Error ("No se pudo obtener las mascotas");
        }
        const data = await response.json()
        setPets(data)
        console.log(data);
      } catch (error) {
        setErrors(error.message);
      }
    } 
  
    fetchPets();

  }, [])

  const [filter, setFilter] = useState('all')

  const filteredPets = pets.filter((p)=>{
    if(filter === 'all') return true;
    return p.species.toLowerCase() == filter;
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
      {filteredPets.map((pet) => (
        <Col key={pet.id_pet} xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Card className="w-full h-full">
            <Card.Img variant="top" src={pet.imageUrl} className="object-cover h-64 w-full" />
            <Card.Body>
              <Card.Title className="name">{pet.name}</Card.Title>
              <Card.Text className="text">Edad: {pet.age}</Card.Text>
              <Card.Text className="text">Raza: {pet.race}</Card.Text>
              <Link to={`/pets/${pet.id_pet}`}><Button className="button-details">Conocer más</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
}


export default Pets