import { obtenerTabla } from "../data/informaciones"
import eliminatoriasJSON from "../data/eliminatorias.json"

export default function Tabla() {
    const puntos = obtenerTabla(eliminatoriasJSON);

    return (<div className="container">
        <table border="1">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                {puntos.map((prediccion, index) => (
                    <tr key={index}>
                        <td>{prediccion.nombre}</td>
                        <td>{prediccion.puntos}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}