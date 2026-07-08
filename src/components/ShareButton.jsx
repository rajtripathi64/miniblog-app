import React, { useEffect, useRef, useState } from 'react'

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-6.6L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.1L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5ZM12 20.2a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-3.3.9.9-3.2-.2-.3A9.2 9.2 0 1 1 12 20.2Zm5-6.9c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5L9.7 6.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3a2.7 2.7 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5H16V4.2A20 20 0 0 0 13.9 4c-2.2 0-3.7 1.3-3.7 3.9v2.6H7.8v3h2.4V21h3.3Z" />
    </svg>
  )
}

// function InstagramIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
//       <rect x="3" y="3" width="18" height="18" rx="5" />
//       <circle cx="12" cy="12" r="3.5" />
//       <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
//     </svg>
//   )
// }

function ShareButton({ url, title = '', className = '', buttonClassName = '' }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef(null)

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

  const toggleOpen = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: XIcon,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      Icon: WhatsAppIcon,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Icon: FacebookIcon,
    },
  ]

  // const handleCopyForInstagram = async (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   try {
  //     await navigator.clipboard.writeText(url)
  //     setCopied(true)
  //     setTimeout(() => setCopied(false), 2000)
  //   } catch {
  //     // clipboard access denied — silently ignore
  //   }
  // }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="Share post"
        aria-expanded={open}
        title="Share"
        className={
          buttonClassName ||
          'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900'
        }
      >
        <ShareIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <p className="px-2 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Share this post
          </p>
          <div className="flex flex-col">
            {shareLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Icon />
                {name}
              </a>
            ))}
            {/* <button
              type="button"
              onClick={handleCopyForInstagram}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <InstagramIcon />
              {copied ? 'Link copied!' : 'Instagram (copy link)'}
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareButton