import { NavLink, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/register.hook";
import { useForm } from "react-hook-form";
import {
    RegisterSchema,
    type RegisterFormData,
} from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSet,
} from "../../../components/ui/field";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../../../components/ui/item";
import {
    ChartLine,
    Package,
    ArrowRight,
    BookOpen,
    Eye,
    EyeClosed,
} from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useState } from "react";

export function RegisterPage() {
    const registerMutation = useRegister();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
    });

    function onSubmit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess: (response) => {
                localStorage.setItem("token", response.token);
                navigate("/login");
            },
        });
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen bg-(--site-bg) p-3 text-(--text-main)">
            <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-7xl overflow-hidden rounded-lg border border-(--border-color) bg-(--site-bg)">

                <aside className="relative hidden w-[36%] flex-col justify-between overflow-hidden border-r border-(--border-color) bg-(--card-bg) p-7 lg:flex">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_30%)]" />

                    <div className="relative">
                        <div className="flex items-center gap-2 text-lg font-bold text-(--text-main)">
                            <BookOpen className="h-5 w-5 text-(--primary-accent)" />
                            LibrisPro
                        </div>
                    </div>

                    <div className="relative">
                        <h1 className="max-w-sm text-4xl font-bold leading-tight tracking-tight text-(--text-main)">
                            Architecting
                            <br />
                            Knowledge
                            <br />
                            Management.
                        </h1>

                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-(--text-secondary)">
                            Join an elite community of curators and administrators.
                            LibrisPro offers high-precision tools for modern library
                            ecosystems.
                        </p>

                        <div className="mt-7 space-y-3">
                            <Item className="border border-(--border-color) bg-(--surface-hover) p-3">
                                <ItemMedia className="flex h-9 w-9 items-center justify-center rounded-md bg-(--accent-bg)">
                                    <ChartLine className="h-4 w-4 text-(--primary-accent)" />
                                </ItemMedia>

                                <ItemContent>
                                    <ItemTitle className="text-sm text-(--text-main)">
                                        Precision Analytics
                                    </ItemTitle>

                                    <ItemDescription className="text-xs text-(--text-secondary)">
                                        Real-time circulation metrics and acquisition
                                        forecasting.
                                    </ItemDescription>
                                </ItemContent>
                            </Item>

                            <Item className="border border-(--border-color) bg-(--surface-hover) p-3">
                                <ItemMedia className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-500/10">
                                    <Package className="h-4 w-4 text-orange-400" />
                                </ItemMedia>

                                <ItemContent>
                                    <ItemTitle className="text-sm text-(--text-main)">
                                        Global Cataloging
                                    </ItemTitle>

                                    <ItemDescription className="text-xs text-(--text-secondary)">
                                        Seamless integration with international
                                        bibliographic standards.
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between border-t border-(--border-color) pt-5 text-[10px] uppercase tracking-wide text-(--text-secondary)">
                        <span>© 2024 Libris Management Systems</span>
                        <span>v4.2.0-STABLE</span>
                    </div>
                </aside>

                <main className="flex flex-1 items-center justify-center bg-(--site-bg) px-6 py-10 sm:px-10">
                    <div className="w-full max-w-xl">
                        <div className="mb-7">
                            <h2 className="text-2xl font-bold tracking-tight text-(--text-main)">
                                Create Account
                            </h2>

                            <p className="mt-1 text-xs text-(--text-secondary)">
                                Initialize your library credentials to begin management.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup className="gap-4">

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field>
                                        <Label
                                            htmlFor="userName"
                                            className="text-[10px] font-semibold uppercase tracking-wide text-(--text-secondary)"
                                        >
                                            Username
                                        </Label>

                                        <Input
                                            id="userName"
                                            placeholder="Alexander"
                                            {...register("username")}
                                            className="h-9 border-(--border-color) bg-(--card-bg) text-sm text-(--text-main) placeholder:text-(--text-secondary)"
                                        />

                                        {errors.username && (
                                            <span className="text-xs text-red-400">
                                                {errors.username.message}
                                            </span>
                                        )}
                                    </Field>

                                    <Field>
                                        <Label
                                            htmlFor="date"
                                            className="text-[10px] font-semibold uppercase tracking-wide text-(--text-secondary)"
                                        >
                                            Birth Date
                                        </Label>

                                        <Input
                                            id="date"
                                            type="date"
                                            {...register("birth")}
                                            className="h-9 border-(--border-color) bg-(--card-bg) text-sm text-(--text-main)"
                                        />

                                        {errors.birth && (
                                            <span className="text-xs text-red-400">
                                                {errors.birth.message}
                                            </span>
                                        )}
                                    </Field>
                                </div>

                                <Field>
                                    <Label
                                        htmlFor="email"
                                        className="text-[10px] font-semibold uppercase tracking-wide text-(--text-secondary)"
                                    >
                                        Email
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemple@library.edu"
                                        {...register("email")}
                                        className="h-9 border-(--border-color) bg-(--card-bg) text-sm text-(--text-main) placeholder:text-(--text-secondary)"
                                    />

                                    {errors.email && (
                                        <span className="text-xs text-red-400">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </Field>

                                <Field>
                                    <Label
                                        htmlFor="password"
                                        className="text-[10px] font-semibold uppercase tracking-wide text-(--text-secondary)"
                                    >
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...register("password")}
                                            className="h-9 border-(--border-color) bg-(--card-bg) pr-10 text-sm text-(--text-main) placeholder:text-(--text-secondary)"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-secondary) hover:text-(--text-main)"
                                        >
                                            {showPassword ? <EyeClosed className="size-4"/> : <Eye className="size-4"/>}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <span className="text-xs text-red-400">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </Field>

                                <div className="flex items-start gap-2 rounded-md border border-(--border-color) bg-(--card-bg) p-3">
                                    <input
                                        type="checkbox"
                                        className="mt-0.5 h-3.5 w-3.5 accent-(--primary-accent)"
                                    />

                                    <p className="text-[10px] leading-relaxed text-(--text-secondary)">
                                        I acknowledge the Terms of Service.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={registerMutation.isPending}
                                    className="h-10 w-full cursor-pointer bg-(--primary-accent) text-(--text-on-accent) hover:opacity-90"
                                >
                                    {registerMutation.isPending
                                        ? "Creating Profile..."
                                        : "Create Profile"}

                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <div className="flex items-center gap-3">
                                    <Separator className="flex-1 bg-(--border-color)" />
                                    <span className="text-[9px] uppercase text-(--text-secondary)">
                                        Or continue
                                    </span>
                                    <Separator className="flex-1 bg-(--border-color)" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-9 border-(--border-color) bg-(--card-bg) text-xs text-(--text-main) hover:bg-(--surface-hover)"
                                    >
                                        Google SSO
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-9 border-(--border-color) bg-(--card-bg) text-xs text-(--text-main) hover:bg-(--surface-hover)"
                                    >
                                        EduID
                                    </Button>
                                </div>

                                <FieldSet className="pt-3 text-center">
                                    <FieldDescription className="text-xs text-(--text-secondary)">
                                        Existing User?{" "}
                                        <NavLink
                                            to="/login"
                                            className="font-semibold text-(--primary-accent) hover:underline"
                                        >
                                            Authenticate here
                                        </NavLink>
                                    </FieldDescription>
                                </FieldSet>

                            </FieldGroup>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}