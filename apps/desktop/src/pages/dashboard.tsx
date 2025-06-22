import { useEffect, useState } from "react";
import { SubjectCodeInput } from "@/components/SubjectCodeInput";
import { InputWithLabel } from "@/components/InputWithLabel";
import { toast } from "sonner";
import FormularioAlumno from "@/components/FormularioAlumno"

type Asignatura = {
  codigo: string;
  nombre: string;
};

export default function Dashboard() {
  const [codigoParcial, setCodigoParcial] = useState("");
  const [asignaturas, setAsignaturas] = useState<any>({});
  const [coincidencias, setCoincidencias] = useState<[string, any][]>([]);
  const [seleccionada, setSeleccionada] = useState<string>("");
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [asignaturaConfirmada, setAsignaturaConfirmada] = useState<
    string | null
  >(null);

  const [asignaturasLocales, setAsignaturasLocales] = useState<Asignatura[]>(
    []
  );

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.leerAsignaturasLocales) {
      window.electronAPI.leerAsignaturasLocales().then((data: Asignatura[]) => {
        console.log("Asignaturas cargadas:", data);
        setAsignaturasLocales(data);
      });
    }
  }, []);

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

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/miskatonictopus/Auswertecontroller/refs/heads/main/asignaturas_FP.json"
    )
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

  return (
    <main className="columns-2 gap-4 p-6">
      <div className="break-inside-avoid mb-4 bg-zinc-950 border border-zinc-800 rounded-md p-4">
        <h2 className="text-white text-lg font-bold mb-2">
          Entrar Asignaturas
        </h2>

        <div className="grid grid-cols-6 gap-4 items-start">
          <div className="col-span-2 space-y-1">
            <SubjectCodeInput onCodigoChange={setCodigoParcial} />
          </div>
          <div className="col-span-4 space-y-2">
            <InputWithLabel
              coincidencias={coincidencias}
              onSeleccionar={setSeleccionada}
            />
            {codigoParcial.length > 0 && coincidencias.length === 0 && (
              <p className="text-sm text-red-300 mt-2">
                El código <strong>{codigoParcial}</strong> no corresponde a
                ninguna asignatura registrada.
              </p>
            )}
            {seleccionada && (
              <div className="flex justify-end">
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => {
                      setSeleccionada("");
                      setAsignaturaConfirmada(null);
                      setMostrarDetalle(false);
                    }}
                    className="flex-1 px-4 py-2 rounded shadow bg-zinc-700 text-white text-xs font-bold hover:bg-stone-400 transition"
                  >
                    CAMBIAR ASIGNATURA
                  </button>
                  <button
                    onClick={confirmarAsignatura}
                    disabled={asignaturaConfirmada === seleccionada}
                    className={`flex-1 px-4 py-2 rounded shadow transition text-xs font-bold
      ${
        asignaturaConfirmada === seleccionada
          ? "bg-zinc-900 text-white cursor-not-allowed"
          : "bg-stone-200 text-black hover:bg-stone-400"
      }
    `}
                  >
                    SELECCIONAR ASIGNATURA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {mostrarDetalle && seleccionada && asignaturas[seleccionada] && (
          <div className="col-span-6 mt-6 p-4 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>Asignatura:</strong>
                <p className="text-emerald-400">
                  {" "}
                  {asignaturas[seleccionada].nombre}
                </p>
              </div>
              <div>
                <strong>Código:</strong>
                <p className="text-emerald-400"> {seleccionada}</p>
              </div>
              <div>
                <strong>Duración:</strong>{" "}
                <p className="text-emerald-400">
                  {asignaturas[seleccionada].duracion}
                </p>
              </div>
              <div>
                <strong>Centro educativo:</strong>
                <p className="text-emerald-400">
                  {asignaturas[seleccionada].centro_educativo}
                </p>
              </div>
              <div>
                <strong>Empresa:</strong>
                <p className="text-emerald-400">
                  {" "}
                  {asignaturas[seleccionada].empresa}
                </p>
              </div>
              <div>
                <strong>ECTS:</strong>
                <p className="text-emerald-400">
                  {" "}
                  {asignaturas[seleccionada].ects}
                </p>
              </div>
            </div>

            <div>
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
                            <th className="border border-zinc-700 px-2 py-1 w-24">
                              CE
                            </th>
                            <th className="border border-zinc-700 px-2 py-1">
                              Descripción
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ra.CE.map((ce: any) => (
                            <tr key={ce.codigo} className="odd:bg-zinc-950">
                              <td className="border border-zinc-800 px-2 py-1">
                                {ce.codigo}
                              </td>
                              <td className="border border-zinc-800 px-2 py-1">
                                {ce.descripcion}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={guardarAsignaturaEnArchivo}
                disabled={!asignaturaConfirmada}
                className={`px-4 mr-2 py-2 rounded shadow transition text-xs font-bold
                    ${
                      !asignaturaConfirmada
                        ? "bg-zinc-900 text-white cursor-not-allowed"
                        : "bg-stone-200 text-black hover:bg-stone-400"
                    }
                  `}
              >
                GUARDAR COMO ARCHIVO LOCAL
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="break-inside-avoid mb-4 bg-zinc-950 border border-zinc-800 rounded-md p-4">
        {/* Aquí puedes colocar detalles, resumen, vista previa, historial, etc. */}
        <h2 className="text-white text-lg font-bold mb-2">Entrar Cursos</h2>
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

      <div className="break-inside-avoid mb-4 bg-zinc-950 border border-zinc-800 rounded-md p-4">
        {/* Aquí puedes colocar detalles, resumen, vista previa, historial, etc. */}
        <h2 className="text-white text-lg font-bold mb-2">Mis Cursos</h2>
        {asignaturasLocales.length > 0 ? (
          <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {asignaturasLocales.map((asig, idx) => (
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
      </div>
    </main>
  );
}
