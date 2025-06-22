// src/components/FormularioAlumno.tsx

import { useState } from "react"

export default function FormularioAlumno() {
  const [nombre, setNombre] = useState("")
  const [curso, setCurso] = useState("")

  const handleGuardar = async () => {
    const alumno = { nombre, curso }
    await window.electronAPI.guardarAlumno(alumno)
    alert("Alumno guardado")
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Registrar Alumno</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGuardar}
      >
        Guardar
      </button>
    </div>
  )
}
