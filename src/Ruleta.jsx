import React, { useRef, useState } from "react";
import "./Ruleta.css";

const Ruleta = () => {
  const ruletaRef = useRef(null);
  const [resultado, setResultado] = useState(null);
  const [girando, setGirando] = useState(false);
  const audioRef = useRef(null); // referencia para el audio actual

  const girarRuleta = () => {
    // Si hay audio sonando, lo detenemos
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const opciones = ["Carla", "Marina"];
    const randomIndex = Math.floor(Math.random() * opciones.length);
    const vueltas = 5 + Math.floor(Math.random() * 4); // entre 5 y 8 vueltas
    const rotacionFinal = vueltas * 360 + randomIndex * 180 + 90;

    // Aplica rotación
    ruletaRef.current.style.transform = `rotate(${rotacionFinal}deg)`;
    setResultado(null);
    setGirando(true);

    // Espera el giro y luego muestra resultado + sonido
    setTimeout(() => {
      const nombre = opciones[randomIndex];
      setResultado(nombre);
      setGirando(false);

      // Crear nuevo audio y guardarlo en la referencia
      const sonido = new Audio(
        `/${
          nombre.toLowerCase() === "carla" ? "musiccarla" : "musicmarina"
        }.mp3`
      );
      audioRef.current = sonido;
      sonido.play();
    }, 4200);
  };

  return (
    <div className="contenedor">
      <div className="ruleta">
        <div className="flecha" />
        <div ref={ruletaRef} className="circulo">
          <span className="texto texto-carla">Carla</span>
          <span className="texto texto-marina">Marina</span>
        </div>
      </div>
      <button disabled={girando} onClick={girarRuleta}>
        Girar
      </button>
      {resultado && <p className="resultado">Ha ganado: {resultado}</p>}
    </div>
  );
};

export default Ruleta;
