import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './componentes/Layout'
import Notas from './pages/Notas'
import Inicio from './pages/Inicio'
import NotaFormulario from './componentes/share/NotaForm'
import Registro from './pages/Registro'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* Ruta pública */}
          <Route index element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/notas" element={<Notas />} />
          <Route path='/crear-nota' element={<NotaFormulario />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
      <Layout />
    </>
  )
}

export default App
