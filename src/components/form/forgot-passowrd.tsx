"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight2, Sms } from "iconsax-react"
import { Link } from "react-router-dom"

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export function ForgotPasswordForm() {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log("Reset password for:", data.email)
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-end gap-4 p-6">
                <Link to="/get-started">
                    <Button variant="outline" className="bg-transparent text-base py-6 px-4 rounded-[15px] font-syne flex items-center font-semibold">
                        Back to Sign In
                        <ArrowRight2 size="35" color="#000000" />
                    </Button>
                </Link>
            </div>

            <div className="flex flex-1 items-top justify-center px-6 py-12">
                <div className="w-full max-w-[520px] space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-syne font-bold tracking-tight">Reset Your Password</h1>
                        <p className="text-muted-foreground font-sans text-lg md:text-lg">Enter your registered email and we’ll send you a link to reset your password.</p>
                    </div>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-syne">Email address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Sms
                                                    size="42"
                                                    color="#888888"
                                                    className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                                                />
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    className="pl-15 py-6 rounded-[18px] font-sans font-medium"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full text-base h-16 py-6 px-8 md:px-10 rounded-[15px] font-syne font-semibold"
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    )
}
