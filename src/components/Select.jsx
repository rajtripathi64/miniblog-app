import React, {useId} from 'react'

function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className='mb-1 inline-block pl-1 text-sm font-medium text-slate-700 dark:text-slate-300'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none duration-200
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                    dark:border-slate-700 dark:bg-slate-800 dark:text-white
                    dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)