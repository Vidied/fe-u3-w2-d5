import "./App.css";
import NavbarMeteo from "./components/NavbarMeteo";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsMeteo from "./components/CardsMeteo";
import { useState } from "react";

function App() {
  const [city, setCity] = useState(null);

  return (
    <div className="bg-dark vh-100">
      <NavbarMeteo onSearch={setCity}></NavbarMeteo>
      <main>{city && <CardsMeteo city={city}></CardsMeteo>}</main>
    </div>
  );
}

export default App;
