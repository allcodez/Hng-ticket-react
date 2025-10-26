import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean().default(false).optional(),
});


export const SignupSchema = z.object({
    fullname: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must not exceed 50 characters"),
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must agree to the terms and conditions"
        })
})

export type SignupFormData = z.infer<typeof SignupSchema>
export type LoginFormData = z.infer<typeof LoginSchema>