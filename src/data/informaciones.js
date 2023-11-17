import jugadores from '../data/jugadores.json'

function calcularPuntosPorPartido(resultadoReal, prediccion) {
    if (!prediccion) {
        return 0
    }
    let puntos = 0
    const acertoGolesLocal = prediccion.prediccion.golesLocal === resultadoReal.golesLocal
    const acertoGolesVisitante = prediccion.prediccion.golesVisitante === resultadoReal.golesVisitante
    if (acertoGolesLocal) {
        puntos += 1
    }
    if (acertoGolesVisitante) {
        puntos += 1
    }
    const acertoResultadoGlobal =
        (resultadoReal.golesLocal > resultadoReal.golesVisitante && prediccion.prediccion.golesLocal > prediccion.prediccion.golesVisitante) ||
        (resultadoReal.golesLocal < resultadoReal.golesVisitante && prediccion.prediccion.golesLocal < prediccion.prediccion.golesVisitante) ||
        (resultadoReal.golesLocal === resultadoReal.golesVisitante && prediccion.prediccion.golesLocal === prediccion.prediccion.golesVisitante)
    if (acertoResultadoGlobal) {
        puntos += 3
    }
    return puntos
}

function obtenerPartidosPorJugador(eliminatorias, jugadorId) {
    return eliminatorias.map(partido => {
        const prediccion = partido.prediccionesUsuarios.find(prediccion => prediccion.usuarioId === jugadorId)
        return {
            partidoId: partido.partidoId,
            equipos: partido.equipos,
            prediccion: prediccion ? prediccion.prediccion : null,
            puntos: calcularPuntosPorPartido(partido.resultadoReal, prediccion)
        }
    }).filter(partido => partido.prediccion !== null)
}

function obtenerNombrePorId(id) {
    const item = jugadores.find(element => element.id === id)
    return item ? item.nombre : null
}

function obtenerTabla(eliminatorias) {
    const puntosUsuarios = {}
    eliminatorias.forEach(partido => {
        const { resultadoReal, prediccionesUsuarios } = partido

        prediccionesUsuarios.forEach(prediccion => {
            const usuarioId = prediccion.usuarioId
            puntosUsuarios[usuarioId] = puntosUsuarios[usuarioId] || 0
            puntosUsuarios[usuarioId] += calcularPuntosPorPartido(resultadoReal, prediccion)
        })
    })
    const lista = Object.keys(puntosUsuarios).map(key => {
        return { nombre: obtenerNombrePorId(key), puntos: puntosUsuarios[key] }
    })
    return lista.sort((a, b) => b.puntos - a.puntos)
}

export { obtenerTabla, obtenerPartidosPorJugador }
