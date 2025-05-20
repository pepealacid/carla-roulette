import React from "react";
import Ruleta from "./Ruleta";
import fondo from "./fondobollo1.png"; // importas desde src

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "100% 100%", // se estira para cubrir todo
        backgroundPosition: "center", // centrado
        backgroundRepeat: "no-repeat", // sin repetirse
        minHeight: "100vh", // altura total
        width: "100vw", // ancho total
      }}
    >
      <Ruleta />
    </div>
  );
}

export default App;
