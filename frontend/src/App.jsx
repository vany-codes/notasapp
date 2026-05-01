import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Info from "./components/Info"
import Notas from "./components/Notas"
import CrearNota from "./components/CrearNota"
import Registro from "./components/Registro"
import Login from "./components/Login"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Info />} />

        <Route path="mis-notas" element={<Notas />} />
        <Route path="nueva" element={<CrearNota />} />

        <Route path="registro" element={<Registro />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
