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
import { Sms, Lock1, EyeSlash, Eye, ArrowRight2 } from 'iconsax-react'
import { LoginSchema } from "@/schema/auth"
import { toast } from "sonner"
import type { StoredUser } from "@/types"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        try {
            const usersData = localStorage.getItem('ticketapp_users')

            if (!usersData) {
                toast.error("No account found", {
                    description: "Please sign up first."
                })
                return
            }

            const users: StoredUser[] = JSON.parse(usersData)
            const user = users.find((u: StoredUser) => u.email === values.email)

            if (!user) {
                toast.error("Invalid credentials", {
                    description: "Email not found. Please check your email or sign up."
                })
                return
            }

            if (user.password !== values.password) {
                toast.error("Invalid credentials", {
                    description: "Incorrect password. Please try again."
                })
                return
            }

            const sessionData = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                token: `mock_token_${Date.now()}`,
                rememberMe: values.rememberMe,
                createdAt: new Date().toISOString()
            }

            localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))

            toast.success("Login successful!", {
                description: `Welcome back, ${user.fullname}!`
            })

            setTimeout(() => {
                navigate('/dashboard')
            }, 1000)

        } catch (error) {
            toast.error("Login failed", {
                description: "Something went wrong. Please try again."
            })
        }
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-end gap-4 p-6">
                <span className="text-muted-foreground font-syne">Don&apos;t have an account?</span>
                <Link to="/signup">
                    <Button variant="outline" className="bg-transparent text-base py-6 px-4 rounded-[15px] font-syne flex items-center font-semibold">
                        Get Started
                        <ArrowRight2 size="35" color="#000000" />
                    </Button>
                </Link>
            </div>

            <div className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-[520px] space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-syne font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-muted-foreground font-sans text-base md:text-lg">Sign in to your workspace to continue.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-syne font-semibold">
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

                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal cursor-pointer">Keep me logged in</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                {/* <Link to="/auth/forgot-password" className="text-sm underline hover:text-foreground">
                                    Forgot password?
                                </Link> */}
                            </div>

                            <Button type="submit" className="w-full text-base h-16 py-6 px-8 md:px-10 rounded-[15px] font-syne font-semibold">
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}