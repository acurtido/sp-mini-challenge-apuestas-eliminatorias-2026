import Tabla from './components/Tabla'
import Predicciones from './components/Predicciones'
import Titulo from './components/Titulo'

function App() {
  return (
    <div className='layout'>
      <Titulo />
      <div className='layout__content'>
        <Predicciones />
        <Tabla />
      </div>
    </div>
  )
}

export default App
