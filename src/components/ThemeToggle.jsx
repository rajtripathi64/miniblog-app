import React from "react";
import { useTheme } from "../context/ThemeContext";

const OPTIONS = [
    {
        value: "light",
        label: "Light",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
        ),
    },
    {
        value: "dark",
        label: "Dark",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
        ),
    },
    {
        value: "system",
        label: "System",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="3" y="4" width="18" height="12" rx="1.5" />
                <path d="M8 20h8M12 16v4" />
            </svg>
        ),
    },
];

function ThemeToggle({ className = "" }) {
    const { theme, setTheme } = useTheme();

    return (
        <div
            role="radiogroup"
            aria-label="Theme"
            className={`inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800 ${className}`}
        >
            {OPTIONS.map((option) => {
                const isActive = theme === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        title={option.label}
                        onClick={() => setTheme(option.value)}
                        className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 ${
                            isActive
                                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-950 dark:text-indigo-400"
                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        }`}
                    >
                        {option.icon}
                        <span className="sr-only">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default ThemeToggle;
