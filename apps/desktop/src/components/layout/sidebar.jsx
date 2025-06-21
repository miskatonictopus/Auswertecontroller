import { Home, BookA, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const menu = [
  { label: "Inicio", icon: <Home /> },
  { label: "Entrar Asignaturas", icon: <BookA /> },
  { label: "Mis Asignaturas", icon: <BookA /> },
  { label: "Ajustes", icon: <Settings /> },
]

export default function Sidebar() {
  const [asignaturasLocales, setAsignaturasLocales] = useState([])

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.leerAsignaturasLocales) {
      window.electronAPI.leerAsignaturasLocales().then(setAsignaturasLocales)
    }
  }, [])

  return (
    <aside className="w-64 h-screen border-r bg-muted p-4 bg-background text-foreground shadow flex flex-col">
      <h2 className="text-lg font-bold mb-6">Auswertecontroller</h2>

      <nav className="space-y-2 mb-4">
        {menu.map((item, idx) => (
          <Button key={idx} variant="ghost" className="w-full justify-start gap-2">
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Lista de asignaturas locales justo debajo de "Mis Asignaturas" */}
      {asignaturasLocales.length > 0 && (
        <div className="mt-2 pl-2 text-sm text-muted-foreground space-y-1">
          <h3 className="text-xs font-semibold uppercase mb-1">Asignaturas locales</h3>
          {asignaturasLocales.map((asig, idx) => (
            <div key={idx} className="truncate">
              <span className="font-medium">{asig.codigo}</span>: {asig.nombre}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
