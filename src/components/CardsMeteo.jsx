import { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
  Container,
  Row,
  Card,
  Button,
  Col,
} from "react-bootstrap";

const CardsMeteo = ({ city, countryCode, onDelete }) => {
  const [meteoData, setMeteoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetcMeteo = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=be198cd32976a2e4238ed8149bd92b47`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Ricevuto i dati:", data);
        setMeteoData(data);
        setLoading(false);
        setError(false);
      } else {
        console.error("Errore ricerca o Fetch");
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log("Errore nel fetch", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetcMeteo();
  }, [city, countryCode]);

  //   if (error) {
  //     <Alert style={{ backgroundColor: "#D1FF00" }}>
  //       Opss... C'è stato un errore!
  //     </Alert>;
  //   }
  //   if (loading) {
  //     <Spinner animation="border" role="status" style={{ color: "#00FF41" }}>
  //       <span className="visually-hidden">Loading...</span>
  //     </Spinner>;
  //   }

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          {" "}
          {loading && (
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#00FF41" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {error && (
            <Alert style={{ backgroundColor: "#D1FF00", color: "#00FF41" }}>
              Opss... C'è stato un errore!
            </Alert>
          )}
          {meteoData && !loading && (
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>{meteoData.name}</Card.Title>
                <Card.Text>
                  <p>{meteoData.sys.country}</p>
                  <p>{meteoData.main.temp}°C</p>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                <Button variant="danger" onClick={onDelete}>
                  Rimuovi
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CardsMeteo;
