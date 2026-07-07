import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600 hover:bg-indigo-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`rounded-lg px-4 py-2 font-medium shadow-sm transition-colors duration-200
                disabled:cursor-not-allowed disabled:opacity-60
                ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}