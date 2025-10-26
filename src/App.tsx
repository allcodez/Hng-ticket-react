import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import ProtectedRoute from './components/miscellaneous/protected-route'
import DashboardLayout from './components/layout/dashboard-layout'
import DashboardHome from './pages/Dashboard/main-dashboard'
import TicketsPage from './pages/Dashboard/ticket-page'
import SettingsPage from './pages/Dashboard/settings-page'
import LoginPage from './pages/Login/login'
import SignupPage from './pages/Signup/signup'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App