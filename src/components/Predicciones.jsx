import { useState } from "react";
import jugadores from "../data/jugadores.json";
import Partidos from "./Partidos";

export default function Predicciones() {
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState('ALE');

    function handleOnChange(e) {
        setJugadorSeleccionado(e.target.value);
    }

    return <div className="container">
        <label htmlFor="participantes">Predicciones: </label>
        <select id="participantes" onChange={(e) => handleOnChange(e)}>
            {jugadores.map(function (data) {
                return <option key={data.id} value={data.id}>{data.nombre}</option>
            })}
        </select>
        <Partidos jugador={jugadorSeleccionado}/>
    </div>;
}
