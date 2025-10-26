import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TicketType as Ticket } from "@/types"
import { Edit, Trash2, Calendar, Flag } from "lucide-react"

interface TicketCardProps {
    ticket: Ticket
    onEdit: () => void
    onDelete: () => void
}

export default function TicketCard({ ticket, onEdit, onDelete }: TicketCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "open":
                return "bg-green-100 text-green-700 border-green-200"
            case "in_progress":
                return "bg-amber-100 text-amber-700 border-amber-200"
            case "closed":
                return "bg-gray-100 text-gray-700 border-gray-200"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case "high":
                return "text-red-500"
            case "medium":
                return "text-amber-500"
            case "low":
                return "text-blue-500"
            default:
                return "text-gray-500"
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    return (
        <Card className="rounded-[18px] shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <Badge className={`${getStatusColor(ticket.status)} border font-syne`}>
                        {ticket.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={onEdit}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={onDelete}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
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
                        <span className="text-xs">{formatDate(ticket.createdAt)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}