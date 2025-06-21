// src/App.jsx
import DashboardLayout from "./components/layout/dashboard-layout"
import DashboardPage from "./pages/dashboard.tsx"


export default function App() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  )
}

  