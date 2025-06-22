// src/components/MisAsignaturas.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RA = {
  codigo: string
  descripcion: string
}

type Asignatura = {
  codigo: string
  nombre: string
  duracion: string
  centro_educativo: string
  empresa: string
  ects: string
  RA?: RA[]
}

interface Props {
  asignaturas: Asignatura[]
}

export default function MisAsignaturas({ asignaturas }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Asignaturas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {asignaturas.length > 0 ? (
          <ul className="space-y-4">
            {asignaturas.map((asig, idx) => (
              <li
                key={idx}
                className="bg-zinc-900 text-emerald-400 rounded-md p-4 shadow-sm space-y-1"
              >
                <p className="text-lg font-bold tracking-tight">
                  {asig.codigo} – {asig.nombre}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-white leading-3 tracking-normal">
                  <p>
                    <strong>Duración total:</strong> {asig.duracion}
                  </p>
                  <p>
                    <strong>ECTS:</strong> {asig.ects}
                  </p>
                  <p>
                    <strong>Horas en clase:</strong> {asig.centro_educativo}
                  </p>
                  <p>
                    <strong>Horas en empresa:</strong> {asig.empresa}
                  </p>
                  <p>
                    <strong>Nº de RA:</strong> {asig.RA?.length || 0}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No hay asignaturas guardadas localmente.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
