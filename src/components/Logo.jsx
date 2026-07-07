import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2 select-none" style={{ width }}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
        M
      </span>
      <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
        Mini<span className="text-indigo-600 dark:text-indigo-400">Blog</span>
      </span>
    </div>
  )
}

export default Logo
