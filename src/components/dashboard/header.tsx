import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function Header() {
    const navigate = useNavigate()

    const session = localStorage.getItem('ticketapp_session')
    const userData = session ? JSON.parse(session) : null

    const handleLogout = () => {
        localStorage.removeItem('ticketapp_session')
        toast.success("Logged out successfully")
        setTimeout(() => {
            navigate('/auth/login')
        }, 1000)
    }

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
            <div>
                <h2 className="font-syne text-lg font-semibold">Welcome back!</h2>
                <p className="text-sm text-muted-foreground">
                    {userData?.fullname || userData?.email || "User"}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}