import { Routes, Route } from 'react-router-dom'
import PoseFinal from './Components/PoseFinal'
import ComposeAll from './Components/ComposeAll'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' Component={ComposeAll} />
          <Route path='/final' Component={PoseFinal} />
        </Routes>
    </>
  )
}

export default App
