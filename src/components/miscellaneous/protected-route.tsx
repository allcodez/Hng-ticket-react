import { Navigate } from "react-router-dom"
import { toast } from "sonner"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const session = localStorage.getItem('ticketapp_session')

    if (!session) {
        toast.error("Please log in to continue")
        return <Navigate to="/auth/login" replace />
    }

    return <>{children}</>
}