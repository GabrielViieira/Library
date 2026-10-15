import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Mail,
    LockKeyhole,
    Eye,
    ArrowRight,
    LifeBuoy,
    KeyRound,
    EyeClosed,
} from "lucide-react";

import {
    loginSchema,
    type LoginFormData,
} from "../schema/login.schema";
import { useLogin } from "../hooks/auth.hook";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

export function LoginPage() {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                localStorage.setItem("token", response.token);
                navigate("/");
            },
        });
    }

    return (
        <main
            className="
                min-h-screen
                w-full
                bg-(--site-bg)
                text-(--text-main)
                flex
                flex-col
                items-center
                relative
                overflow-hidden
            "
        >
            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                    opacity-25
                "
                style={{
                    backgroundImage: `
                        radial-gradient(
                            circle,
                            rgba(148,163,184,.35) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "42px 42px",
                }}
            />

            <div
                className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2
                    h-80
                    w-80
                    rounded-full
                    bg-[rgba(59,130,246,0.08)]
                    blur-3xl
                    pointer-events-none
                "
            />

            <header
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    items-center
                    pt-8
                    pb-7
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-lg
                        font-bold
                        tracking-tight
                        text-(--text-main)
                    "
                >
                    <div
                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-(--primary-accent)
                        "
                    />

                    LibrisPro
                </div>

                <span
                    className="
                        mt-1
                        text-[10px]
                        text-(--text-secondary)
                    "
                >
                    Library Management Portal
                </span>
            </header>

            <section
                className="
                    relative
                    z-10
                    w-[calc(100%-32px)]
                    max-w-110
                    rounded-md
                    border
                    border-(--border-color)
                    bg-(--card-bg)
                    p-6
                    shadow-(--shadow-lg)
                "
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <FieldSet className="mb-5">
                            <FieldLegend
                                className="
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-(--text-main)
                                "
                            >
                                Welcome Back
                            </FieldLegend>

                            <FieldDescription
                                className="
                                    mt-1
                                    max-w-xs
                                    text-xs
                                    leading-5
                                    text-(--text-secondary)
                                "
                            >
                                Enter your credentials to access the admin
                                system.
                            </FieldDescription>
                        </FieldSet>

                        <FieldGroup className="gap-4">

                            <Field>
                                <FieldLabel
                                    htmlFor="email"
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-(--text-main)
                                    "
                                >
                                    Email Address
                                </FieldLabel>

                                <div className="relative">
                                    <Mail
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            size-4
                                            text-(--text-secondary)
                                        "
                                    />

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@librispro.com"
                                        disabled={loginMutation.isPending}
                                        {...register("email")}
                                        className="
                                            h-10
                                            rounded-sm
                                            border-(--border-color)
                                            bg-(--site-bg)
                                            pl-10
                                            text-sm
                                            text-(--text-main)
                                            placeholder:text-(--text-secondary)
                                            focus-visible:border-(--primary-accent)
                                            focus-visible:ring-(--primary-accent)
                                        "
                                    />
                                </div>

                                {errors.email && (
                                    <span className="text-xs text-red-400">
                                        {errors.email.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-(--text-main)
                                        "
                                    >
                                        Password
                                    </FieldLabel>

                                    <button
                                        type="button"
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-(--primary-accent)
                                            hover:underline
                                            cursor-pointer
                                        "
                                    >
                                        Forgot?
                                    </button>
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            size-4
                                            text-(--text-secondary)
                                        "
                                    />

                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        disabled={loginMutation.isPending}
                                        {...register("password")}
                                        className="
                                            h-10
                                            rounded-sm
                                            border-(--border-color)
                                            bg-(--site-bg)
                                            pl-10
                                            pr-10
                                            text-sm
                                            text-(--text-main)
                                            placeholder:text-(--text-secondary)
                                            focus-visible:border-(--primary-accent)
                                            focus-visible:ring-(--primary-accent)
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-(--text-secondary)
                                            hover:text-(--text-main)
                                            cursor-pointer
                                        "
                                    >
                                        {showPassword ? (
                                            <EyeClosed className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <span className="text-xs text-red-400">
                                        {errors.password.message}
                                    </span>
                                )}
                            </Field>

                        </FieldGroup>

                        <label
                            className="
                                flex
                                items-center
                                gap-2
                                mt-1
                                cursor-pointer
                                select-none
                            "
                        >
                            <input
                                type="checkbox"
                                className="
                                    size-3.5
                                    accent-(--primary-accent)
                                    cursor-pointer
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    text-(--text-secondary)
                                "
                            >
                                Remember this device
                            </span>
                        </label>

                        <Button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="
                                mt-1
                                h-10
                                w-full
                                rounded-sm
                                bg-(--primary-accent)
                                text-sm
                                font-semibold
                                text-(--text-on-accent)
                                hover:opacity-90
                                transition
                                cursor-pointer
                            "
                        >
                            {loginMutation.isPending ? (
                                "Signing in..."
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 size-4" />
                                </>
                            )}
                        </Button>

                        <div className="relative my-1">
                            <Separator className="bg-(--border-color)" />
                        </div>

                        <div className="text-center">
                            <span
                                className="
                                    text-[10px]
                                    text-(--text-secondary)
                                "
                            >
                                Need technical support?
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <Button
                                type="button"
                                variant="outline"
                                className="
                                    h-9
                                    rounded-sm
                                    border-(--border-color)
                                    bg-transparent
                                    text-[10px]
                                    text-(--text-main)
                                    hover:bg-(--surface-hover)
                                    cursor-pointer
                                "
                            >
                                <LifeBuoy className="size-3.5" />
                                Help Desk
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="
                                    h-9
                                    rounded-sm
                                    border-(--border-color)
                                    bg-transparent
                                    text-[10px]
                                    text-(--text-main)
                                    hover:bg-(--surface-hover)
                                    cursor-pointer
                                "
                            >
                                <KeyRound className="size-3.5" />
                                SSO Login
                            </Button>

                        </div>

                    </FieldGroup>
                </form>
            </section>

            <footer
                className="
                    relative
                    z-10
                    mt-7
                    max-w-xs
                    text-center
                    text-[9px]
                    leading-4
                    text-(--text-secondary)
                "
            >
                © 2026 LibrisPro Management System.
                <br />
                Secure Tier 4 Access Required.
            </footer>

            <div className="relative z-10 mt-4 text-center text-xs">
                <span className="text-(--text-secondary)">
                    Don't have an account?
                </span>{" "}
                <NavLink
                    to="/register"
                    className="
                        font-semibold
                        text-(--primary-accent)
                        hover:underline
                    "
                >
                    Register here
                </NavLink>
            </div>
        </main>
    );
}