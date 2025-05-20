import React, { useRef, useState } from "react";
import "./Ruleta.css";

const Ruleta = () => {
  const ruletaRef = useRef(null);
  const [resultado, setResultado] = useState(null);
  const [girando, setGirando] = useState(false);
  const audioRef = useRef(null); // referencia para el audio actual

  function fadeOutAudio(audio, duration = 1000) {
    const step = 50; // milisegundos entre pasos
    const steps = duration / step;
    const volumeStep = audio.volume / steps;

    const fade = setInterval(() => {
      if (audio.volume - volumeStep > 0) {
        audio.volume -= volumeStep;
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fade);
      }
    }, step);
  }

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

      // Cortar con fade out después de 5 segundos
      setTimeout(() => {
        if (audioRef.current) {
          fadeOutAudio(audioRef.current, 1000); // 1 segundo de desvanecimiento
        }
      }, 5000);
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
