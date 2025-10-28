import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Link } from "react-router-dom"
import { User, Sms, Lock1, EyeSlash, Eye, ArrowRight2 } from 'iconsax-react'
import { SignupSchema } from "@/schema/auth"
import { toast } from "sonner"
import type { StoredUser } from "@/types"

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            agreeToTerms: false,
        },
    })

    function onSubmit(values: z.infer<typeof SignupSchema>) {
        try {
            const usersData = localStorage.getItem('ticketapp_users')
            const users: StoredUser[] = usersData ? JSON.parse(usersData) : []

            const existingUser = users.find((u: StoredUser) => u.email === values.email)
            if (existingUser) {
                toast.error("Email already registered", {
                    description: "Please use a different email or log in."
                })
                return
            }

            const newUser = {
                id: `user_${Date.now()}`,
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                createdAt: new Date().toISOString()
            }

            users.push(newUser)
            localStorage.setItem('ticketapp_users', JSON.stringify(users))

            const sessionData = {
                id: newUser.id,
                fullname: newUser.fullname,
                email: newUser.email,
                token: `mock_token_${Date.now()}`,
                createdAt: new Date().toISOString()
            }
            localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))

            toast.success("Account created successfully!", {
                description: "Welcome to Ticket Management App"
            })

            setTimeout(() => {
                navigate('/dashboard')
            }, 1000)

        } catch (error) {
            toast.error("Registration failed", {
                description: "Something went wrong. Please try again."
            })
        }
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-end gap-4 p-6">
                <span className="text-muted-foreground font-syne">Already have an account?</span>
                <Link to="/auth/login">
                    <Button variant="outline" className="bg-transparent text-base py-6 px-4 border-0 font-syne flex items-center font-semibold">
                        Sign In
                        <ArrowRight2 size="35" color="#000000" />
                    </Button>
                </Link>
            </div>

            <div className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-[520px] space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-syne font-bold tracking-tight">Get Started</h1>
                        <p className="text-muted-foreground font-sans text-base md:text-lg">Create your account to start managing tickets.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-syne font-semibold">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User size="42" color="#888888" className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className="pl-15 py-6 rounded-[18px] font-sans font-medium"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Email address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Sms size="42" color="#888888" className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock1 size="42" color="#888888" className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="• • • • • • • •"
                                                    className="pl-15 py-6 rounded-[18px] font-sans font-medium"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showPassword ? <EyeSlash size="42" color="#888888" className="h-5 w-5" /> : <Eye size="42" color="#888888" className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="agreeToTerms"
                                render={({ field }) => (
                                    <FormItem className="flex items-start gap-2 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer leading-relaxed">
                                            I agree to the{" "}
                                            <Link to="/terms" className="underline hover:text-foreground">
                                                Terms and Conditions
                                            </Link>{" "}
                                            and{" "}
                                            <Link to="/privacy" className="underline hover:text-foreground">
                                                Privacy Policy
                                            </Link>
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full text-base h-16 py-6 px-8 md:px-10 rounded-[15px] font-syne font-semibold">
                                Create Account
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
