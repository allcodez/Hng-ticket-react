import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { TicketType as Ticket } from "@/types"
import TicketCard from "@/components/ticket/ticket-card"
import CreateTicketDialog from "@/components/ticket/create-ticket-dialog"
import EditTicketDialog from "@/components/ticket/edit-ticket-dialog"
import DeleteTicketDialog from "@/components/ticket/delete-ticket-dialog"
import { getCurrentUserId, getUserTickets, saveUserTickets } from "@/utils/ticket-storage"
import { toast } from "sonner"

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
    const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null)

    useEffect(() => {
        loadTickets()
    }, [])

    useEffect(() => {
        filterTickets()
    }, [tickets, searchQuery, statusFilter])

    const filterTickets = () => {
        let filtered = [...tickets]

        if (searchQuery) {
            filtered = filtered.filter(ticket =>
                ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(ticket => ticket.status === statusFilter)
        }

        setFilteredTickets(filtered)
    }

    const loadTickets = () => {
        const userId = getCurrentUserId()
        if (!userId) return

        const parsedTickets: Ticket[] = getUserTickets(userId)
        setTickets(parsedTickets)
    }

    const handleCreateTicket = (newTicket: Ticket) => {
        const userId = getCurrentUserId()
        if (!userId) {
            toast.error("Session expired", {
                description: "Please log in again"
            })
            return
        }

        const updatedTickets = [...tickets, newTicket]
        saveUserTickets(userId, updatedTickets)
        setTickets(updatedTickets)
        setIsCreateOpen(false)
    }

    const handleUpdateTicket = (updatedTicket: Ticket) => {
        const userId = getCurrentUserId()
        if (!userId) return

        const updatedTickets = tickets.map(t =>
            t.id === updatedTicket.id ? updatedTicket : t
        )
        saveUserTickets(userId, updatedTickets)
        setTickets(updatedTickets)
        setEditingTicket(null)
    }

    const handleDeleteTicket = (ticketId: string) => {
        const userId = getCurrentUserId()
        if (!userId) return

        const updatedTickets = tickets.filter(t => t.id !== ticketId)
        saveUserTickets(userId, updatedTickets)
        setTickets(updatedTickets)
        setDeletingTicket(null)
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-syne text-3xl font-bold">Tickets</h1>
                    <p className="text-muted-foreground">
                        Manage and track all your tickets
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="gap-2 font-syne rounded-[15px]"
                >
                    <Plus className="h-5 w-5" />
                    Create Ticket
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-[15px]"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-[15px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[18px] border-2 border-dashed py-12">
                    <p className="mb-4 text-center text-muted-foreground">
                        {tickets.length === 0
                            ? "No tickets yet. Create your first ticket!"
                            : "No tickets match your filters."}
                    </p>
                    {tickets.length === 0 && (
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            variant="outline"
                            className="gap-2 rounded-[15px]"
                        >
                            <Plus className="h-5 w-5" />
                            Create First Ticket
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onEdit={() => setEditingTicket(ticket)}
                            onDelete={() => setDeletingTicket(ticket)}
                        />
                    ))}
                </div>
            )}

            <CreateTicketDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onCreateTicket={handleCreateTicket}
            />

            {editingTicket && (
                <EditTicketDialog
                    open={!!editingTicket}
                    onOpenChange={(open) => !open && setEditingTicket(null)}
                    ticket={editingTicket}
                    onUpdateTicket={handleUpdateTicket}
                />
            )}

            {deletingTicket && (
                <DeleteTicketDialog
                    open={!!deletingTicket}
                    onOpenChange={(open) => !open && setDeletingTicket(null)}
                    ticket={deletingTicket}
                    onDeleteTicket={handleDeleteTicket}
                />
            )}
        </div>
    )
}