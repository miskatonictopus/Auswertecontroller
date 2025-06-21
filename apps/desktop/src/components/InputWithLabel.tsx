// src/components/InputWithLabel.tsx
import { Input } from "./ui/input"
import { useState, useEffect } from "react"

export function InputWithLabel({ coincidencias, onSeleccionar }: { coincidencias: [string, any][], onSeleccionar: (codigo: string) => void }) {
  const [seleccionado, setSeleccionado] = useState<string>("")

  const handleSeleccion = (codigo: string) => {
    setSeleccionado(codigo)
    onSeleccionar(codigo)
  }

  return (
    <div className="w-full max-w-sm">
      <label className="text-sm font-semibold text-foreground block mb-2">Asignatura</label>
      <Input type="text" value={seleccionado} placeholder="Nombre" readOnly />

      {coincidencias.length > 0 && (
        <ul className="mt-2 border rounded p-2 bg-muted text-sm max-h-40 overflow-auto">
          {coincidencias.map(([codigo, info]) => (
            <li key={codigo} className="cursor-pointer hover:bg-accent px-2 py-1 rounded" onClick={() => handleSeleccion(codigo)}>
              <strong>{codigo}</strong>: {info.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}