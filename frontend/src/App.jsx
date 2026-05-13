import { Route, Routes } from "react-router"
import Layout from "./pages/Layout"
import Info from "./pages/public/Info"
import Notas from "./pages/public/Notas"
import CrearNota from "./pages/public/CrearNota"
import Registro from "./pages/priv/Registro"
import Login from "./pages/priv/Login"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Info />} />
        <Route path="inicio" element={<Info />} />

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
