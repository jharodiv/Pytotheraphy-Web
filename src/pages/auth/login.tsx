
import { useAuth } from "@hooks/authentication/useAuth";

import LoginForm from "@components/authentication/LoginForm";

export default function Login() {
    const {
        email,
        password,
        setEmail,
        setPassword,
        emailError,
        passwordError,
        loading,
        error,
        handleLogin,
    } = useAuth();

    return (
        <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            emailError={emailError}
            passwordError={passwordError}
            loading={loading}
            error={error}
            handleLogin={handleLogin}
        />
    );
}