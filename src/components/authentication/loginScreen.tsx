import { useAuth } from "@hooks/authentication/useAuth";

import styles from "./Login.module.css";

export default function LoginScreen() {
    const {
        user,
        login,
        error,
        loading
    } = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>
                    Sign in to your account
                </p>

                <div className={styles.formGroup}>
                    <input
                        className={`${styles.input} ${emailError ? styles.inputError : ""
                            }`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailError && (
                        <span className={styles.error}>
                            {emailError}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <input
                        className={`${styles.input} ${passwordError ? styles.inputError : ""
                            }`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {passwordError && (
                        <span className={styles.error}>
                            {passwordError}
                        </span>
                    )}
                </div>

                <button
                    className={styles.button}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Login"}
                </button>
            </div>
        </div>
    );
}