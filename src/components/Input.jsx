import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
             {label && (
                <label
                    className='mb-1 inline-block pl-1 text-sm font-medium text-slate-700 dark:text-slate-300'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
            type={type}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none duration-200
                    placeholder:text-slate-400
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                    dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500
                    dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input