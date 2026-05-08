import { useState } from "react";
import { Form, Row, Col, Container, Navbar } from "react-bootstrap";

function NavbarMeteo() {
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Cerco il meteo per:", query);
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#121212" }}>
      <Container>
        <Navbar.Brand style={{ color: "#00FF41" }}>Cyber-Meteo</Navbar.Brand>

        <Form
          inline="true"
          className="flex-grow-1 mx-3"
          onSubmit={handleSearch}
        >
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Form.Control
                style={{ backgroundColor: "#0D0D0D", color: "#003B00" }}
                id="NavbarSearch"
                type="search"
                placeholder="Cerca la tua località! Es. Rome, IT"
                className="rounded-pill shadow-none"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarMeteo;
