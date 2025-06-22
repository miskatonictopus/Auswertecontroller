// src/components/NuevaAsignatura.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/InputWithLabel"
import { useState } from "react"

interface NuevaAsignaturaProps {
  codigoParcial: string
  setCodigoParcial: (v: string) => void
  coincidencias: string[]
  seleccionada: string
  setSeleccionada: (v: string) => void
  asignaturaConfirmada: string | null
  setAsignaturaConfirmada: (v: string | null) => void
  confirmarAsignatura: () => void
  setMostrarDetalle: (v: boolean) => void
}

export default function NuevaAsignatura({
  codigoParcial,
  setCodigoParcial,
  coincidencias,
  seleccionada,
  setSeleccionada,
  asignaturaConfirmada,
  setAsignaturaConfirmada,
  confirmarAsignatura,
  setMostrarDetalle,
}: NuevaAsignaturaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Asignatura</CardTitle>
        <p className="text-sm pt-2 text-neutral-500 grid grid-cols-1 md:grid-cols-2 gap-4">Introduce el código de asignatura y selecciona la asignatura a la derecha</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full max-w-[10rem]">
            <Label htmlFor="codigo">Código</Label>
            <Input
              id="codigo"
              placeholder="Introduce código"
              value={codigoParcial}
              onChange={(e) => setCodigoParcial(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <InputWithLabel
              coincidencias={coincidencias}
              onSeleccionar={setSeleccionada}
            />
          </div>
        </div>

        {codigoParcial.length > 0 && coincidencias.length === 0 && (
          <p className="text-sm text-red-500">
            El código <strong>{codigoParcial}</strong> no corresponde a ninguna asignatura registrada.
          </p>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="secondary"
            onClick={() => {
              setSeleccionada("")
              setAsignaturaConfirmada(null)
              setMostrarDetalle(false)
            }}
          >
            Cambiar
          </Button>
          <Button
            onClick={confirmarAsignatura}
            disabled={asignaturaConfirmada === seleccionada}
          >
            Confirmar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
