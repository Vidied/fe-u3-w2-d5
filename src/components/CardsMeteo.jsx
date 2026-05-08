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
  const [cityImage, setCityImage] = useState(null);

  const fetchCityImage = async (cityName) => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${cityName}&per_page=1`,
        {
          headers: {
            Authorization:
              "BHcPyzIycHPf3X3vPfe241uV67ifUs6ZmbLdG2JrfmdIfJXwt8gpxNQb",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Ricevuto i dati:", data);
        setCityImage(data.photos[0].src.large);
      } else {
        console.error("Errore ricerca o Fetch immagine");
        setCityImage("https://placecats.com/300/200");
      }
    } catch (error) {
      console.log("Errore nel fetch immagine", error);
      setCityImage("https://placecats.com/300/200");
    }
  };

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
        fetchCityImage(data.name);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetcMeteo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Container className="mt-2">
      <Row className="align-items-center">
        <Card className="cyber-card h-100">
          <Row className="g-0 h-100">
            <Col xs={4} style={{ height: "180px" }}>
              <Card.Img
                src={cityImage || "https://placecats.com/300/200"}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Col>{" "}
            <Col xs={8}>
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
                <Card.Body>
                  <Card.Title className="cyber-text-main">
                    {meteoData.name}
                  </Card.Title>
                  <Card.Text>
                    <p className="cyber-temp">{meteoData.sys.country}</p>
                    <p className="cyber-temp">
                      Il tempo è: {meteoData.weather[0].main} con{" "}
                      {meteoData.weather[0].description}
                    </p>{" "}
                    <div className="d-flex justify-content-between">
                      {" "}
                      <p className="cyber-temp">
                        Temperatura attuale: {meteoData.main.temp}°C
                      </p>
                      <p className="cyber-temp">
                        Temperatura minima: {meteoData.main.temp_min}°C
                      </p>
                      <p className="cyber-temp">
                        Temperatura massima: {meteoData.main.temp_max}°C
                      </p>
                    </div>
                  </Card.Text>
                  <div className="d-flex gap-2 align-items-center justify-content-end">
                    <Button variant="danger" onClick={onDelete}>
                      Rimuovi
                    </Button>
                  </div>
                </Card.Body>
              )}
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default CardsMeteo;
