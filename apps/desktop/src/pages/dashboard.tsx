import { useEffect, useState } from "react";
import { toast } from "sonner";

import NuevaAsignatura from "@/components/NuevaAsignatura";
import FormularioAlumno from "@/components/FormularioAlumno";
import MisAsignaturas from "@/components/MisAsignaturas";

import { SubjectCodeInput } from "@/components/SubjectCodeInput";
import { InputWithLabel } from "@/components/InputWithLabel";

export default function Dashboard() {
  const [codigoParcial, setCodigoParcial] = useState("");
  const [asignaturas, setAsignaturas] = useState<any>({});
  const [coincidencias, setCoincidencias] = useState<[string, any][]>([]);
  const [seleccionada, setSeleccionada] = useState("");
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [asignaturaConfirmada, setAsignaturaConfirmada] = useState<string | null>(null);
  const [asignaturasLocales, setAsignaturasLocales] = useState<any[]>([]);

  useEffect(() => {
    window.electronAPI?.leerAsignaturasLocales?.().then((data) => {
      console.log("Asignaturas cargadas:", data);
      setAsignaturasLocales(data);
    });
  }, []);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/miskatonictopus/Auswertecontroller/refs/heads/main/asignaturas_FP.json")
      .then((res) => res.json())
      .then((data) => setAsignaturas(data))
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  useEffect(() => {
    if (codigoParcial.length === 0) {
      setCoincidencias([]);
    } else {
      const resultado = Object.entries(asignaturas).filter(([codigo]) =>
        codigo.startsWith(codigoParcial)
      );
      setCoincidencias(resultado);
    }
  }, [codigoParcial, asignaturas]);

  const confirmarAsignatura = () => {
    if (seleccionada && asignaturas[seleccionada]) {
      setAsignaturaConfirmada(seleccionada);
      setMostrarDetalle(true);
    }
  };

  const guardarAsignaturaEnArchivo = async () => {
    if (asignaturaConfirmada && asignaturas[asignaturaConfirmada]) {
      const datos = {
        codigo: asignaturaConfirmada,
        ...asignaturas[asignaturaConfirmada],
      };

      const result = await window.electronAPI.guardarAsignaturaJSON(
        `asignatura_${asignaturaConfirmada}.json`,
        datos
      );

      if (result.success) {
        toast.success("Asignatura guardada correctamente", {
          description: `Archivo: asignatura_${asignaturaConfirmada}.json`,
          duration: 4000,
        });
      } else {
        toast.error("Error al guardar la asignatura", {
          description: result.error,
          duration: 5000,
        });
      }
    } else {
      toast("Falta seleccionar una asignatura", {
        description: "Debes confirmar una asignatura antes de guardarla",
        duration: 3000,
      });
    }
  };

  return (
    <main className="columns-2 gap-4 p-6">
      <NuevaAsignatura
        codigoParcial={codigoParcial}
        setCodigoParcial={setCodigoParcial}
        coincidencias={coincidencias}
        seleccionada={seleccionada}
        setSeleccionada={setSeleccionada}
        asignaturaConfirmada={asignaturaConfirmada}
        setAsignaturaConfirmada={setAsignaturaConfirmada}
        confirmarAsignatura={confirmarAsignatura}
        setMostrarDetalle={setMostrarDetalle}
      />

      {mostrarDetalle && seleccionada && asignaturas[seleccionada] && (
        <div className="break-inside-avoid mb-4 bg-zinc-950 border border-zinc-800 rounded-md p-4 text-white space-y-4">
          <h2 className="text-lg font-bold text-white mb-2">Detalle de Asignatura</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><strong>Asignatura:</strong> {asignaturas[seleccionada].nombre}</p>
            <p><strong>Código:</strong> {seleccionada}</p>
            <p><strong>Duración:</strong> {asignaturas[seleccionada].duracion}</p>
            <p><strong>Centro educativo:</strong> {asignaturas[seleccionada].centro_educativo}</p>
            <p><strong>Empresa:</strong> {asignaturas[seleccionada].empresa}</p>
            <p><strong>ECTS:</strong> {asignaturas[seleccionada].ects}</p>
          </div>

          <div className="max-h-[400px] overflow-y-auto pr-2">
            <h3 className="text-base font-bold mt-4 mb-2 text-stone-400">
              Resultados de aprendizaje y criterios
            </h3>
            <div className="space-y-4">
              {asignaturas[seleccionada].RA.map((ra: any) => (
                <div key={ra.codigo}>
                  <p className="font-light mb-1 text-emerald-400">
                    {ra.codigo}: {ra.descripcion}
                  </p>
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

          <div className="flex justify-end">
            <button
              onClick={guardarAsignaturaEnArchivo}
              disabled={!asignaturaConfirmada}
              className={`px-4 mr-2 py-2 rounded shadow transition text-xs font-bold ${
                !asignaturaConfirmada
                  ? "bg-zinc-900 text-white cursor-not-allowed"
                  : "bg-stone-200 text-black hover:bg-stone-400"
              }`}
            >
              GUARDAR COMO ARCHIVO LOCAL
            </button>
          </div>
        </div>
      )}

      <div className="break-inside-avoid mb-4">
        <FormularioAlumno
          onGuardar={(alumno) => {
            window.electronAPI.guardarAlumno(alumno).then((res) => {
              if (res.success) {
                toast.success("Alumno guardado correctamente");
              } else {
                toast.error("Error al guardar", { description: res.error });
              }
            });
          }}
        />
      </div>

      <MisAsignaturas asignaturas={asignaturasLocales} />
    </main>
  );
}
