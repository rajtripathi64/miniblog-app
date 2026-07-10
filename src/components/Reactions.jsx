import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import reactionService from '../appwrite/reactions'

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢']

function Reactions({ postId, className = '' }) {
  const [reactions, setReactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const containerRef = useRef(null)
  const authUserData = useSelector((state) => state.auth.userData)

  const load = useCallback(() => {
    reactionService.getReactionsForPost(postId).then((docs) => {
      setReactions(docs)
      setLoading(false)
    })
  }, [postId])

  useEffect(() => {
    load()
  }, [load])

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

  const counts = EMOJIS.reduce((acc, emoji) => {
    acc[emoji] = reactions.filter((r) => r.emoji === emoji).length
    return acc
  }, {})

  const myReaction = authUserData
    ? reactions.find((r) => r.userId === authUserData.$id)?.emoji
    : undefined

  const handleToggleOpen = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!authUserData) return
    setOpen((prev) => !prev)
  }

  const handlePick = async (emoji, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!authUserData || busy) return

    setBusy(true)
    setOpen(false)
    await reactionService.setReaction(postId, authUserData.$id, emoji)
    await load()
    setBusy(false)
  }

  if (loading) {
    return <div className={`h-7 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800 ${className}`} />
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-center gap-1.5 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {EMOJIS.filter((emoji) => counts[emoji] > 0).map((emoji) => (
        <span
          key={emoji}
          className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
            myReaction === emoji
              ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300'
              : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <span>{emoji}</span>
          <span>{counts[emoji]}</span>
        </span>
      ))}

      <button
        type="button"
        onClick={handleToggleOpen}
        disabled={!authUserData || busy}
        title={authUserData ? 'React' : 'Log in to react'}
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        {myReaction || '🙂'}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-20 mb-2 flex gap-0.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={(e) => handlePick(emoji, e)}
              title={myReaction === emoji ? '' : `React with ${emoji}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-lg transition-transform duration-100 hover:scale-125 ${
                myReaction === emoji ? 'bg-indigo-100 dark:bg-indigo-950/50' : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reactions
