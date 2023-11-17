import eliminatoriasJSON from "../data/eliminatorias.json";
import { obtenerPartidosPorJugador } from "../data/informaciones";

export default function Partidos(props) {
    const partidosPorJugador = obtenerPartidosPorJugador(eliminatoriasJSON, props.jugador)

    return (
        <div className='partidos'>  
            {partidosPorJugador.map((partido, index) => (
                <p key={index}>{partido.equipos.local} {partido.prediccion.golesLocal} vs. {partido.equipos.visitante} {partido.prediccion.golesVisitante} - Puntos: {partido.puntos} </p>
            ))}
        </div>
    )
}