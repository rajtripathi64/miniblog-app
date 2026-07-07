import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

function getSystemPrefersDark() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
    );
}

function getInitialTheme() {
    if (typeof window === "undefined") return "system";

    const stored = window.localStorage.getItem("miniblog-theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }
    return "system";
}

export function ThemeProvider({ children }) {
    // `theme` is the user's chosen preference: 'light' | 'dark' | 'system'
    const [theme, setTheme] = useState(getInitialTheme);
    // `resolvedTheme` is what's actually applied: 'light' | 'dark'
    const [resolvedTheme, setResolvedTheme] = useState(() =>
        getInitialTheme() === "system"
            ? (getSystemPrefersDark() ? "dark" : "light")
            : getInitialTheme()
    );

    useEffect(() => {
        const applyResolved = () => {
            const resolved =
                theme === "system"
                    ? (getSystemPrefersDark() ? "dark" : "light")
                    : theme;

            setResolvedTheme(resolved);

            const root = document.documentElement;
            if (resolved === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        applyResolved();
        window.localStorage.setItem("miniblog-theme", theme);

        // Keep in sync with OS changes while "system" is selected
        if (theme === "system") {
            const mql = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => applyResolved();
            mql.addEventListener?.("change", handleChange);
            return () => mql.removeEventListener?.("change", handleChange);
        }
    }, [theme]);

    // Kept for convenience: cycles light -> dark -> system -> light
    const toggleTheme = () => {
        setTheme((prev) =>
            prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
