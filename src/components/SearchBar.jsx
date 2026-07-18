import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import userService from '../appwrite/users'

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function SearchBar({ className = '' }) {
  const [open, setOpen] = useState(false)
  const [rawTerm, setRawTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedTerm = useDebounce(rawTerm, 300)
  const latestRequestId = useRef(0)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Run a search whenever the debounced term settles.
  useEffect(() => {
    const term = debouncedTerm.trim()

    if (!term) {
      setResults([])
      setLoading(false)
      return
    }

    latestRequestId.current += 1
    const requestId = latestRequestId.current
    setLoading(true)

    userService.searchUsers(term).then((docs) => {
      // Discard this response if a newer search has since been fired -
      // the race-condition guard from earlier.
      if (requestId === latestRequestId.current) {
        setResults(docs)
        setLoading(false)
      }
    })
  }, [debouncedTerm])

  // Close on outside click or Escape.
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const closeAndReset = () => {
    setOpen(false)
    setRawTerm('')
    setResults([])
  }

  const handleToggleOpen = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (open) {
      closeAndReset()
      return
    }
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSelect = (username) => {
    closeAndReset()
    navigate(`/u/${username}`)
  }

  return (
    <div ref={containerRef} className={`relative flex items-center justify-end ${className}`}>
      {/* Icon + expanding input, both live in the same row so the input
          grows out of the icon's position instead of appearing below it. */}
      <div className="flex h-9 items-center">
        <div
          className={`flex items-center overflow-hidden rounded-full border transition-all duration-200 ease-out ${
            open
              ? 'w-56 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 sm:w-64'
              : 'w-9 border-transparent bg-transparent'
          }`}
        >
          <button
            type="button"
            onClick={handleToggleOpen}
            aria-label={open ? 'Close search' : 'Search people'}
            aria-expanded={open}
            title={open ? 'Close search' : 'Search'}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
              open
                ? 'text-slate-500 dark:text-slate-400'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            }`}
          >
            {open ? <CloseIcon /> : <SearchIcon />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={rawTerm}
            onChange={(e) => setRawTerm(e.target.value)}
            placeholder="Search people..."
            tabIndex={open ? 0 : -1}
            className="w-full min-w-0 bg-transparent pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Results dropdown - anchored under the expanded input */}
      {open && rawTerm.trim().length > 0 && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:w-64">
          {loading && (
            <p className="px-2 py-3 text-center text-sm text-slate-400 dark:text-slate-500">
              Searching...
            </p>
          )}

          {!loading && results.length === 0 && (
            <p className="px-2 py-3 text-center text-sm text-slate-400 dark:text-slate-500">
              No users found
            </p>
          )}

          {!loading &&
            results.map((user) => (
              <button
                key={user.$id}
                type="button"
                onClick={() => handleSelect(user.username)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">
                    @{user.username}
                  </span>
                  {user.name && (
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.name}
                    </span>
                  )}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
