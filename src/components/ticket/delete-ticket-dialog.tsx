import type { TicketType as Ticket } from "@/types"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteTicketDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    ticket: Ticket
    onDeleteTicket: (ticketId: string) => void
}

export default function DeleteTicketDialog({
    open,
    onOpenChange,
    ticket,
    onDeleteTicket,
}: DeleteTicketDialogProps) {
    const handleDelete = () => {
        try {
            onDeleteTicket(ticket.id)
            toast.success("Ticket deleted successfully!")
        } catch (error) {
            toast.error("Failed to delete ticket", {
                description: "Please try again"
            })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-syne text-xl">
                        Delete Ticket
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>"{ticket.title}"</strong>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-[15px]">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="rounded-[15px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}