import "./App.css";
import NavbarMeteo from "./components/NavbarMeteo";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsMeteo from "./components/CardsMeteo";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

function App() {
  const [cities, setCities] = useState([]);
  const addCity = (newCity) => {
    const citySmall = newCity.trim();
    if (citySmall && !cities.includes(citySmall)) {
      setCities([citySmall, ...cities]);
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div className="bg-cyber min-vh-100">
      <NavbarMeteo onSearch={addCity}></NavbarMeteo>
      <main>
        <Container>
          <Row className="justify-content-center">
            {cities.map((cityName) => (
              <CardsMeteo
                key={cityName}
                city={cityName}
                onDelete={() => removeCity(cityName)}
              />
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
