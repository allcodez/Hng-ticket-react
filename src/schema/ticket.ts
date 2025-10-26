import * as z from "zod";

export const TicketSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must not exceed 100 characters"),
    status: z.enum(["open", "in_progress", "closed"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be 'open', 'in_progress', or 'closed'"
    }),
    description: z
        .string()
        .max(500, "Description must not exceed 500 characters")
        .optional(),
    priority: z.enum(["low", "medium", "high"]).optional()
})

export type TicketFormData = z.infer<typeof TicketSchema>