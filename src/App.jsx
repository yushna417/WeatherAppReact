import { NavbarComponent as Navbar } from "./components/navbar";
import { Weather } from "./components/weather";
import { useState } from "react";


function App() {
  const [city, setCity] = useState("")
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-blue-300/50"
    >
      <Navbar setCity={setCity} />
      <div className="bg-slate-600/80 h-full">
        <Weather city={city} />
      </div>
    </div>
  );
}

export default App;
