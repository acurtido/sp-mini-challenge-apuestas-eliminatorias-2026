// const predicciones = partidosJson.map(partido => {
//     const prediccion = partido.prediccionesUsuarios.find(prediccion => prediccion.usuarioId === 'HEC');
//     return {
//         partidoId: partido.partidoId,
//         equipos: partido.equipos,
//         prediccion: prediccion ? prediccion.prediccion : null
//     };
// }).filter(partido => partido.prediccion !== null);

function calcularPuntosPorPartido(resultadoReal, prediccion) {
    let puntos = 0;
    const acertoGolesLocal = prediccion.prediccion.golesLocal === resultadoReal.golesLocal;
    const acertoGolesVisitante = prediccion.prediccion.golesVisitante === resultadoReal.golesVisitante;
    if (acertoGolesLocal) {
        puntos += 1;
    }
    if (acertoGolesVisitante) {
        puntos += 1;
    }
    const acertoResultadoGlobal =
        (resultadoReal.golesLocal > resultadoReal.golesVisitante && prediccion.prediccion.golesLocal > prediccion.prediccion.golesVisitante) ||
        (resultadoReal.golesLocal < resultadoReal.golesVisitante && prediccion.prediccion.golesLocal < prediccion.prediccion.golesVisitante) ||
        (resultadoReal.golesLocal === resultadoReal.golesVisitante && prediccion.prediccion.golesLocal === prediccion.prediccion.golesVisitante);
    if (acertoResultadoGlobal) {
        puntos += 3;
    }
    return puntos;
}

export function obtenerPartidosPorJugador(eliminatorias, jugadorId) {
    return eliminatorias.map(partido => {
        const prediccion = partido.prediccionesUsuarios.find(prediccion => prediccion.usuarioId === jugadorId);
        return {
            partidoId: partido.partidoId,
            equipos: partido.equipos,
            prediccion: prediccion ? prediccion.prediccion : null
        };
    }).filter(partido => partido.prediccion !== null);
}

export function calcularPuntos(eliminatorias) {
    const puntosUsuarios = {};

    eliminatorias.forEach(partido => {
        const { resultadoReal, prediccionesUsuarios } = partido;

        prediccionesUsuarios.forEach(prediccion => {
            const usuarioId = prediccion.usuarioId;
            puntosUsuarios[usuarioId] = puntosUsuarios[usuarioId] || 0;
            puntosUsuarios[usuarioId] += calcularPuntosPorPartido(resultadoReal, prediccion);
        });
    });

    return puntosUsuarios;
}
