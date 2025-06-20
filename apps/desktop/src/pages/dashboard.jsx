// src/pages/dashboard.jsx
import { InputWithLabel } from "@/components/InputWithLabel"
import { SubjectCodeInput } from "@/components/SubjectCodeInput"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <header className="h-16 px-6 flex items-center border-b bg-background text-foreground">
        {/* <h1 className="text-xl font-semibold">Panel principal</h1> */}
      </header>

      <main className="p-6">
        <SubjectCodeInput /><InputWithLabel />
      </main>
    </div>
  )
}

  