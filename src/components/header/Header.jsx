import React, { useState } from 'react'
import { Container, Logo, LogoutBtn, ThemeToggle } from '../index'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  const linkClasses = ({ isActive }) =>
    `block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <Logo width="150px" />
          </NavLink>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink to={item.slug} className={linkClasses} end={item.slug === '/'}>
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="flex flex-col gap-1 border-t border-slate-200 py-3 md:hidden dark:border-slate-800">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    end={item.slug === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="w-full text-left" />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header
