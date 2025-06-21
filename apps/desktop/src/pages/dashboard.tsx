import { useEffect, useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { SubjectCodeInput } from "@/components/SubjectCodeInput"
import { InputWithLabel } from "@/components/InputWithLabel"

export default function Dashboard() {
  const [codigoParcial, setCodigoParcial] = useState("")
  const [asignaturas, setAsignaturas] = useState<any>({})
  const [coincidencias, setCoincidencias] = useState<[string, any][]>([])
  const [seleccionada, setSeleccionada] = useState<string>("")
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [asignaturaConfirmada, setAsignaturaConfirmada] = useState<string | null>(null)
  const [mensajeGuardado, setMensajeGuardado] = useState("")

  const guardarAsignaturaEnArchivo = async () => {
    if (asignaturaConfirmada && asignaturas[asignaturaConfirmada]) {
      const datos = {
        codigo: asignaturaConfirmada,
        ...asignaturas[asignaturaConfirmada],
      }
  
      const result = await window.electronAPI.guardarAsignaturaJSON(
        `asignatura_${asignaturaConfirmada}.json`,
        datos
      )
  
      if (result.success) {
        setMensajeGuardado("✅ Asignatura guardada correctamente.")
      } else {
        setMensajeGuardado(`❌ Error: ${result.error}`)
      }
    }
  }
  


  useEffect(() => {
    fetch("https://raw.githubusercontent.com/miskatonictopus/Auswertecontroller/refs/heads/main/asignaturas_FP.json")
      .then((res) => res.json())
      .then((data) => setAsignaturas(data))
      .catch((err) => console.error("Error al cargar JSON:", err))
  }, [])

  useEffect(() => {
    if (codigoParcial.length === 0) {
      setCoincidencias([])
    } else {
      const resultado = Object.entries(asignaturas).filter(([codigo]) =>
        codigo.startsWith(codigoParcial)
      )
      setCoincidencias(resultado)
    }
  }, [codigoParcial, asignaturas])

  const confirmarAsignatura = () => {
    if (seleccionada && asignaturas[seleccionada]) {
      setAsignaturaConfirmada(seleccionada)
      setMostrarDetalle(true)
    }
  }

  return (
    <main className="grid grid-cols-12 gap-4 p-6">
  <div className="col-span-5 p-4 bg-zinc-950 border border-zinc-800 rounded-md">
    <Tabs defaultValue="asignaturas" className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="asignaturas">Entrar Asignaturas</TabsTrigger>
        <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
      </TabsList>

      <TabsContent value="asignaturas">
  <div className="grid grid-cols-6 gap-4 items-start">
    <div className="col-span-2 space-y-1">
      <SubjectCodeInput onCodigoChange={setCodigoParcial} />
    </div>
    <div className="col-span-4 space-y-2">
      <InputWithLabel coincidencias={coincidencias} onSeleccionar={setSeleccionada} />
      {codigoParcial.length > 0 && coincidencias.length === 0 && (
  <p className="text-sm text-red-300 mt-2">
    El código <strong>{codigoParcial}</strong> no corresponde a ninguna asignatura registrada.
  </p>
)}
      {seleccionada && (
        <div className="flex justify-end">
<div className="flex justify-between gap-2">
<button
    onClick={() => {
      setSeleccionada("")
      setAsignaturaConfirmada(null)
      setMostrarDetalle(false)
    }}
    className="flex-1 px-4 py-2 rounded shadow bg-zinc-700 text-white text-xs font-bold hover:bg-orange-300 transition"
  >
    CAMBIAR ASIGNATURA
  </button>
  <button
    onClick={confirmarAsignatura}
    disabled={asignaturaConfirmada === seleccionada}
    className={`flex-1 px-4 py-2 rounded shadow transition text-xs font-bold
      ${asignaturaConfirmada === seleccionada
        ? 'bg-zinc-900 text-white cursor-not-allowed'
        : 'bg-emerald-600 text-black dark:bg-emerald-600 dark:text-white hover:bg-neutral-300'}
    `}
  >
    SELECCIONAR ASIGNATURA
  </button>
</div>
        </div>
      )}
    </div>
  </div>
</TabsContent>

{mostrarDetalle && seleccionada && asignaturas[seleccionada] && (
  <div className="col-span-6 mt-6 p-4 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white space-y-4">
    <div className="grid grid-cols-2 gap-2">
      <div><strong>Asignatura:</strong><p className="text-emerald-300"> {asignaturas[seleccionada].nombre}</p></div>
      <div><strong>Código:</strong><p className="text-emerald-500"> {seleccionada}</p></div>
      <div><strong>Duración:</strong> <p className="text-emerald-500">{asignaturas[seleccionada].duracion}</p></div>
      <div><strong>Centro educativo:</strong><p className="text-emerald-500">{asignaturas[seleccionada].centro_educativo}</p></div>
      <div><strong>Empresa:</strong><p className="text-emerald-500"> {asignaturas[seleccionada].empresa}</p></div>
      <div><strong>ECTS:</strong><p className="text-emerald-500"> {asignaturas[seleccionada].ects}</p></div>
    </div>

    <div>
    <div className="max-h-[400px] overflow-y-auto pr-2">
      <h3 className="text-base font-bold mt-4 mb-2 text-orange-300">Resultados de aprendizaje y criterios</h3>
      <div className="space-y-4">
        {asignaturas[seleccionada].RA.map((ra: any) => (
          <div key={ra.codigo}>
            <p className="font-light mb-1 text-emerald-300">{ra.codigo}: {ra.descripcion}</p>
            <table className="w-full text-sm border-collapse border border-zinc-800">
              <thead className="bg-zinc-800 text-left">
                <tr>
                  <th className="border border-zinc-700 px-2 py-1 w-24">CE</th>
                  <th className="border border-zinc-700 px-2 py-1">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {ra.CE.map((ce: any) => (
                  <tr key={ce.codigo} className="odd:bg-zinc-950">
                    <td className="border border-zinc-800 px-2 py-1">{ce.codigo}</td>
                    <td className="border border-zinc-800 px-2 py-1">{ce.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
    </div>
    <button
  onClick={guardarAsignaturaEnArchivo}
  disabled={!asignaturaConfirmada}
  className={`flex-1 px-4 py-2 rounded shadow transition text-xs font-bold
    ${!asignaturaConfirmada
      ? 'bg-zinc-900 text-white cursor-not-allowed'
      : 'bg-purple-600 text-white hover:bg-purple-500'}
  `}
>
  GUARDAR COMO ARCHIVO LOCAL
</button>
{mensajeGuardado && (
  <p className="text-sm mt-2 text-green-500">{mensajeGuardado}</p>
)}
  </div>
  
)}



      <TabsContent value="ajustes">
        <p className="text-muted-foreground">Aquí irán los ajustes futuros.</p>
      </TabsContent>
    </Tabs>
  </div>
</main>

  )
}
