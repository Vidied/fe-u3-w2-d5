import "./App.css";
import NavbarMeteo from "./components/NavbarMeteo";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsMeteo from "./components/CardsMeteo";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  const [cities, setCities] = useState([]);
  const addCity = (newCity) => {
    if (newCity && !cities.includes(newCity)) {
      setCities([newCity, ...cities]);
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div className="bg-dark vh-100">
      <NavbarMeteo onSearch={addCity}></NavbarMeteo>
      <main>
        <Container>
          <Row>
            {cities.map((cityName) => (
              <Col key={cityName} xs={12} md={6} lg={4}>
                <CardsMeteo
                  city={cityName}
                  onDelete={() => removeCity(cityName)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
