import { Home, BookA, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Logo from "../../assets/auswerte_logo.png";

const menu = [
  { label: "Inicio", icon: <Home /> },
  { label: "Asignaturas", icon: <BookA /> },
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
    <aside className="w-64 h-screen border-r bg-zinc-950 p-4 text-foreground shadow flex flex-col">
      <div className="mb-6">

        <img src={Logo} alt="Logo" className="h-12 mx-auto mb-6" />

      </div>

      

      <nav className="space-y-2 mb-4">
        {menu.map((item, idx) => (
          <Button key={idx} variant="ghost" className="w-full justify-start gap-2">
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>
    </aside>
  )
}
