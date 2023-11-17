import { calcularPuntos } from "../data/informaciones"
import eliminatoriasJSON from "../data/eliminatorias.json"

export default function Tabla() {
    const puntos = calcularPuntos(eliminatoriasJSON);
    console.log(puntos);

    return <div className="container">
        <h1>Tabla</h1>
    </div>
}