import { useState } from "react";

import { Button, Card, Input } from "@components/ui";

import { useLogin } from "@hooks/authentication/useAuth";

import logo from "@assets/images/LOGO.png";

export default function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        loading,
        handleLogin,
    } = useLogin();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f6f2] px-4 py-8">
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#dfe7dc]/60 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#e5ebe1]/70 blur-3xl" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#edf1ea]/80 blur-3xl" />

            <Card className="relative z-10 w-full max-w-md border border-[#e1e5de] bg-white p-8 shadow-[0_20px_60px_rgba(45,62,45,0.08)] sm:p-10">
                {/* Logo / Brand */}
                <div className="mb-9 text-center">
                    <div className="mx-auto mb-5 flex h-30 w-30 items-center justify-center p-3">
                        <img
                            src={logo}
                            alt="Phytotherapy logo"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <h1 className="!text-[#486344] text-3xl font-semibold tracking-tight">
                        Phytotherapy
                    </h1>

                    <p className="mt-2 text-sm text-[#737c72]">
                        Admin Portal
                    </p>
                </div>

                {/* Login Form */}
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            error={emailError}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        {/* Password */}
                        <div className="relative">
                            <Input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                value={password}
                                error={passwordError}
                                className="pr-11"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    // Eye off
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3l18 18"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4 9.5 7-0.4 1.2-1.2 2.5-2.3 3.6"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.2 6.2C4.5 7.4 3.4 9.2 2.5 12c1 3 4.5 7 9.5 7 1.4 0 2.7-.3 3.8-.8"
                                        />
                                    </svg>
                                ) : (
                                    // Eye
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="2.5"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="w-full !bg-[#486344] !text-white hover:!bg-[#3d5739]"
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-[#e8ebe5] pt-5 text-center">
                    <p className="text-xs text-[#8a9288]">
                        Authorized personnel only
                    </p>
                </div>
            </Card>
        </main>
    );
}