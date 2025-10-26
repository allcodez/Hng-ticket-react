import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TicketSchema, type TicketFormData } from "@/schema/ticket"
import type { TicketType as Ticket } from "@/types"

interface CreateTicketDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreateTicket: (ticket: Ticket) => void
}

export default function CreateTicketDialog({
    open,
    onOpenChange,
    onCreateTicket,
}: CreateTicketDialogProps) {
    const form = useForm<TicketFormData>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            title: "",
            status: "open",
            description: "",
            priority: "medium",
        },
    })

    const onSubmit = (data: TicketFormData) => {
        try {
            const newTicket: Ticket = {
                id: `ticket_${Date.now()}`,
                ...data,
                createdAt: new Date().toISOString(),
            }

            onCreateTicket(newTicket)
            toast.success("Ticket created successfully!")
            form.reset()
        } catch (error) {
            toast.error("Failed to create ticket", {
                description: "Please try again"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="font-syne text-2xl">Create New Ticket</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new ticket. Fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-syne">Title *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter ticket title"
                                            className="rounded-[15px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-syne">Status *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="rounded-[15px]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-syne">Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="rounded-[15px]">
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-syne">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter ticket description"
                                            className="min-h-[100px] rounded-[15px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-[15px]"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="rounded-[15px] font-syne">
                                Create Ticket
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}