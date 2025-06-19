import { Home, BarChart, Settings } from "lucide-react"
import { Button } from "../ui/button" // o "@/components/ui/button"

const menu = [
  { label: "Inicio", icon: <Home /> },
  { label: "Analítica", icon: <BarChart /> },
  { label: "Ajustes", icon: <Settings /> },
]

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-muted p-4">
      <h2 className="text-lg font-bold mb-6">Auswertecontroller</h2>
      <nav className="space-y-2">
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
