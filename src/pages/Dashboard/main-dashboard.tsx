import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Ticket, CheckCircle2, Clock, AlertCircle, Plus, Calendar, Flag } from "lucide-react"
import { useEffect, useState } from "react"
import type { TicketType, TicketStats } from "@/types"
import EditTicketDialog from "@/components/ticket/edit-ticket-dialog"
// import { getCurrentUserId, getUserTickets } from "@/utils/ticketStorage"
import { getCurrentUserId, getUserTickets, saveUserTickets } from "@/utils/ticket-storage"

export default function DashboardHome() {
    const navigate = useNavigate()
    const [stats, setStats] = useState<TicketStats>({
        total: 0,
        open: 0,
        in_progress: 0,
        closed: 0
    })
    const [tickets, setTickets] = useState<TicketType[]>([])
    const [editingTicket, setEditingTicket] = useState<TicketType | null>(null)

    const loadTickets = () => {
        const userId = getCurrentUserId()
        if (!userId) return

        const parsedTickets: TicketType[] = getUserTickets(userId)
        setTickets(parsedTickets)
        setStats({
            total: parsedTickets.length,
            open: parsedTickets.filter((t) => t.status === 'open').length,
            in_progress: parsedTickets.filter((t) => t.status === 'in_progress').length,
            closed: parsedTickets.filter((t) => t.status === 'closed').length
        })
    }

    const handleUpdateTicket = (updatedTicket: TicketType) => {
        const userId = getCurrentUserId()
        if (!userId) return

        const updatedTickets = tickets.map(t =>
            t.id === updatedTicket.id ? updatedTicket : t
        )
        saveUserTickets(userId, updatedTickets)
        setTickets(updatedTickets)
        setEditingTicket(null)
        loadTickets()
    }

        useEffect(() => {
        loadTickets()
    }, [])

    const statsCards = [
        {
            title: "Total Tickets",
            value: stats.total,
            icon: Ticket,
            color: "text-blue-500"
        },
        {
            title: "Open Tickets",
            value: stats.open,
            icon: AlertCircle,
            color: "text-green-500"
        },
        {
            title: "In Progress",
            value: stats.in_progress,
            icon: Clock,
            color: "text-amber-500"
        },
        {
            title: "Closed Tickets",
            value: stats.closed,
            icon: CheckCircle2,
            color: "text-gray-500"
        }
    ]

    const kanbanColumns = [
        {
            id: 'open',
            title: 'Open',
            status: 'open' as const,
            icon: AlertCircle,
            color: 'bg-green-100 text-green-700',
            badgeColor: 'bg-green-500'
        },
        {
            id: 'in_progress',
            title: 'IN PROGRESS',
            status: 'in_progress' as const,
            icon: Clock,
            color: 'bg-[#fe9a00] text-white',
            badgeColor: 'bg-[#fe9a00]'
        },
        {
            id: 'closed',
            title: 'Closed',
            status: 'closed' as const,
            icon: CheckCircle2,
            color: 'bg-gray-100 text-gray-700',
            badgeColor: 'bg-gray-500'
        }
    ]

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-500'
            case 'medium':
                return 'text-amber-500'
            case 'low':
                return 'text-blue-500'
            default:
                return 'text-gray-500'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-syne text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your ticket management</p>
                </div>
                <Button onClick={() => navigate('/dashboard/tickets')} className="font-syne">
                    Manage Tickets
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title} className="rounded-[18px] shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="font-syne text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-5 w-5 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="font-syne text-3xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-syne text-2xl font-bold">Tickets Board</h2>
                    <Button
                        onClick={() => navigate('/dashboard/tickets')}
                        variant="outline"
                        size="sm"
                        className="font-syne"
                    >
                        View All
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {kanbanColumns.map((column) => {
                        const columnTickets = tickets.filter(t => t.status === column.status)
                        const Icon = column.icon

                        return (
                            <div key={column.id} className="space-y-3">
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        <span className="font-syne text-sm font-semibold uppercase tracking-wide">
                                            {column.title}
                                        </span>
                                    </div>
                                    <Badge variant="secondary" className={`${column.badgeColor} text-white`}>
                                        {columnTickets.length}
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    {columnTickets.length === 0 ? (
                                        <Card className="rounded-[15px] border-dashed">
                                            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                                                <p className="text-sm text-muted-foreground">No tickets</p>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        columnTickets.map((ticket) => (
                                            <Card
                                                key={ticket.id}
                                                className="cursor-pointer rounded-[18px] shadow-md transition-shadow hover:shadow-lg"
                                                onClick={() => setEditingTicket(ticket)}
                                            >
                                                <CardContent className="space-y-3">
                                                    <h3 className="font-syne text-lg font-bold leading-tight">
                                                        {ticket.title}
                                                    </h3>

                                                    {ticket.description && (
                                                        <p className="line-clamp-3 text-sm text-muted-foreground">
                                                            {ticket.description}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between pt-2">
                                                        {ticket.priority && (
                                                            <div className="flex items-center gap-1">
                                                                <Flag className={`h-4 w-4 ${getPriorityColor(ticket.priority)}`} />
                                                                <span className={`text-sm font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                                                                    {ticket.priority}
                                                                </span>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Calendar className="h-4 w-4" />
                                                            <span className="text-xs">
                                                                {formatDate(ticket.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}

                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 rounded-[15px] border-dashed text-muted-foreground hover:border-solid hover:text-foreground"
                                        onClick={() => navigate('/dashboard/tickets')}
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span className="font-syne text-sm">Add Ticket</span>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            {editingTicket && (
                <EditTicketDialog
                    open={!!editingTicket}
                    onOpenChange={(open) => !open && setEditingTicket(null)}
                    ticket={editingTicket}
                    onUpdateTicket={handleUpdateTicket}
                />
            )}
        </div>
    )
}