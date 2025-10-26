import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Ticket,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { toast } from "sonner"
import type { SidebarProps } from "@/types"

// interface SidebarProps {
//     isCollapsed: boolean
//     onToggle: () => void
// }

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        title: "Tickets",
        icon: Ticket,
        path: "/dashboard/tickets"
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/dashboard/settings"
    }
]

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('ticketapp_session')
        toast.success("Logged out successfully")
        setTimeout(() => {
            navigate('/auth/login')
        }, 1000)
    }

    return (
        <aside
            className={cn(
                "relative flex flex-col border-r bg-card transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex h-16 items-center border-b px-4">
                {!isCollapsed && (
                    <Link to="/dashboard" className="font-syne text-xl font-bold">
                        TicketApp
                    </Link>
                )}
                {isCollapsed && (
                    <Link to="/dashboard" className="font-syne text-xl font-bold">
                        T
                    </Link>
                )}
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
                onClick={onToggle}
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                ) : (
                    <ChevronLeft className="h-4 w-4" />
                )}
            </Button>

            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="font-syne font-medium">{item.title}</span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t p-4">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                        isCollapsed && "justify-center"
                    )}
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    {!isCollapsed && <span className="font-syne font-medium">Logout</span>}
                </Button>
            </div>
        </aside>
    )
}