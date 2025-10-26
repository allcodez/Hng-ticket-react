export interface User {
    fullname?: string
    email: string
    token: string
    createdAt: string
    rememberMe?: boolean
}

export interface Session {
    user: User
    isAuthenticated: boolean
}

export type TicketStatus = 'open' | 'in_progress' | 'closed'

export interface TicketType {
    id: string
    title: string
    status: TicketStatus
    description?: string
    priority?: 'low' | 'medium' | 'high'
    createdAt: string
    updatedAt?: string
}

export interface TicketStats {
    total: number
    open: number
    in_progress: number
    closed: number
}

export interface LoginFormData {
    email: string
    password: string
    rememberMe?: boolean
}

export interface SignupFormData {
    fullname: string
    email: string
    password: string
    agreeToTerms: boolean
}

export interface ProtectedRouteProps {
    children: React.ReactNode
}

export interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

export interface StoredUser {
    id: string
    fullname: string
    email: string
    password: string
    createdAt: string
}

export interface SessionData {
    id: string
    fullname: string
    email: string
    token: string
    rememberMe?: boolean
    createdAt: string
}