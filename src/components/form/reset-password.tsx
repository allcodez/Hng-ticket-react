"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { Lock1, EyeSlash, Eye, ArrowRight2 } from 'iconsax-react';
import FormFooter from "../miscellaneous/form-footer"

const formSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/\d/, "Password must include a number")
            .regex(/[A-Z]/, "Password must include an uppercase letter")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

interface PasswordRequirement {
    label: string
    met: boolean
}

export default function ResetPasswordForm() {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })

    const newPassword = form.watch("newPassword")

    const requirements: PasswordRequirement[] = [
        { label: "At least 8 characters", met: newPassword.length >= 8 },
        { label: "Includes a number", met: /\d/.test(newPassword) },
        { label: "Includes an uppercase letter", met: /[A-Z]/.test(newPassword) },
        { label: "Includes a special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
    ]

    const metRequirements = requirements.filter((r) => r.met).length
    const passwordStrength = metRequirements === 0 ? 0 : (metRequirements / requirements.length) * 100

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200"
        if (passwordStrength <= 25) return "bg-red-500"
        if (passwordStrength <= 50) return "bg-orange-500"
        if (passwordStrength <= 75) return "bg-yellow-500"
        return "bg-success"
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("[v0] Password reset submitted:", values)
    }


    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-end gap-4 p-6">
                <Link href="/get-started">
                    <Button variant="outline" className="bg-transparent text-base py-6 px-4 rounded-[15px] font-syne flex items-center font-semibold">
                        Back to Sign In
                        <ArrowRight2 size="35" color="#000000" />
                    </Button>
                </Link>
            </div>

            <div className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-[520px] space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-syne font-bold tracking-tight">Reset Your Password</h1>
                        <p className="text-muted-foreground font-sans text-base md:text-lg">Enter and confirm your new password to regain access.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-syne">New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock1
                                                    size="42"
                                                    color="#888888"
                                                    className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                                                />
                                                <Input
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    className="pl-15 py-6 rounded-[18px] font-sans font-medium"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeSlash size="42" color="#888888" className="h-5 w-5" />
                                                    ) : (
                                                        <Eye size="42" color="#888888" className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-syne">Confirm New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock1
                                                    size="42"
                                                    color="#888888"
                                                    className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                                                />
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Re-Enter new password"
                                                    className="pl-15 py-6 rounded-[18px] font-sans font-medium"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeSlash size="42" color="#888888" className="h-5 w-5" />
                                                    ) : (
                                                        <Eye size="42" color="#888888" className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {newPassword && (
                                <div className="space-y-3">
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 3].map((index) => (
                                            <div
                                                key={index}
                                                className={`h-1 flex-1 rounded-full transition-colors ${index < metRequirements ? getStrengthColor() : "bg-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {passwordStrength === 0 && "Weak password. Must contain:"}
                                        {passwordStrength > 0 && passwordStrength < 100 && "Weak password. Must contain:"}
                                        {passwordStrength === 100 && "Strong password!"}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                {requirements.map((requirement, index) => (
                                    <div key={index} className="flex items-center gap-2 cursor-default">
                                        <Checkbox checked={requirement.met} className={requirement.met ? "bg-[#1FC16B] border-success" : ""} />
                                        <span
                                            className={`text-sm transition-colors ${requirement.met ? "text-foreground" : "text-muted-foreground"
                                                }`}
                                        >
                                            {requirement.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button type="submit" className="w-full text-base h-16 py-6 px-8 md:px-10 rounded-[15px] font-semibold">
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

            <FormFooter />
        </div>
    )
}
