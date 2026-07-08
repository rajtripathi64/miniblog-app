import React from 'react'

function AuthorHeader({ userName, className = '' }) {
  if (!userName) return null

  const initial = userName.charAt(0).toUpperCase()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
        {initial}
      </span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        @{userName}
      </span>
    </div>
  )
}

export default AuthorHeader
