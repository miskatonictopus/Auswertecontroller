import Sidebar from "./sidebar"
import Header from "./header"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* <Header /> */}
        <main className="flex-1 p-6 overflow-y-auto  bg-zinc-900 text-foreground shadow">
          {children}
        </main>
      </div>
    </div>
  )
}
