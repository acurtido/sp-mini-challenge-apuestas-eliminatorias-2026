import jugadores from "../data/jugadores.json";
import eliminatoriasJSON from "../data/eliminatorias.json";
import { obtenerPartidosPorJugador } from "../data/informaciones";

export default function Predicciones() {
    const partidosPorJugador = obtenerPartidosPorJugador(eliminatoriasJSON, 'HEC');
    console.log(partidosPorJugador);
    return <div className="container">
        <label htmlFor="participantes">Selecciones:</label>
        <br />
        <select id="participantes">
            {jugadores.map(function (data) {
                return <option key={data.id} value={data.id}>{data.nombre}</option>
            })}
        </select>

    </div>;
}
