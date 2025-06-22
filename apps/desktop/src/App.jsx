import DashboardLayout from "./components/layout/dashboard-layout"
import DashboardPage from "./pages/dashboard.tsx"
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
  