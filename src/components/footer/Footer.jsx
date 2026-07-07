// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo'

// const linkClass =
//   'text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'

// function Footer() {
//   return (
//     <footer className=" border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
//       <div className="mx-auto max-w-7xl px-4 py-12">
//         <div className="flex flex-wrap gap-10">
//           <div className="w-full lg:max-w-xs lg:flex-1">
//             <Logo width="150px" />
//             <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
//               A simple, fast place to write and share your thoughts with the world.
//             </p>
//           </div>

//           <div className="w-full sm:w-auto sm:flex-1">
//             <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
//               Company
//             </h3>
//             <ul className="space-y-3">
//               <li><Link className={linkClass} to="/">Features</Link></li>
//               <li><Link className={linkClass} to="/">Pricing</Link></li> 
//               <li><Link className={linkClass} to="/">Affiliate Program</Link></li>
//               <li><Link className={linkClass} to="/">Press Kit</Link></li>
//             </ul>
//           </div>

//           <div className="w-full sm:w-auto sm:flex-1">
//             <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
//               Support
//             </h3>
//             <ul className="space-y-3">
//               <li><Link className={linkClass} to="/">Account</Link></li>
//               <li><Link className={linkClass} to="/">Help</Link></li>
//               <li><Link className={linkClass} to="/">Contact Us</Link></li>
//               <li><Link className={linkClass} to="/">Customer Support</Link></li>
//             </ul>
//           </div>

//           <div className="w-full sm:w-auto sm:flex-1">
//             <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
//               Legal
//             </h3>
//             <ul className="space-y-3">
//               <li><Link className={linkClass} to="/">Terms &amp; Conditions</Link></li>
//               <li><Link className={linkClass} to="/">Privacy Policy</Link></li>
//               <li><Link className={linkClass} to="/">Licensing</Link></li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-400">
//           <p>&copy; {new Date().getFullYear()} MiniBlog. All rights reserved to RAJ.</p>
//           <div className="flex items-center gap-4">
//             <a href="#" aria-label="Twitter" className="hover:text-indigo-600 dark:hover:text-indigo-400">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//                 <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
//               </svg>
//             </a>
//             <a href="https://github.com/rajtripathi64" aria-label="GitHub" className="hover:text-indigo-600 dark:hover:text-indigo-400">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//                 <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1-1.5-1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.6 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.3.2 2.3.1 2.6a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .3.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const linkClass =
  'text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'

function Footer() {
  const [expanded, setExpanded] = useState(false)

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      {/* Expandable details: hidden by default, revealed on demand */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pt-8">
          <div className="flex flex-wrap gap-10">
            <div className="w-full lg:max-w-xs lg:flex-1">
              <Logo width="150px" />
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                A simple, fast place to write and share your thoughts with the world.
              </p>
            </div>

            <div className="w-full sm:w-auto sm:flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link className={linkClass} to="/">Features</Link></li>
                <li><Link className={linkClass} to="/">Pricing</Link></li>
                <li><Link className={linkClass} to="/">Affiliate Program</Link></li>
                <li><Link className={linkClass} to="/">Press Kit</Link></li>
              </ul>
            </div>

            <div className="w-full sm:w-auto sm:flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Support
              </h3>
              <ul className="space-y-3">
                <li><Link className={linkClass} to="/">Account</Link></li>
                <li><Link className={linkClass} to="/">Help</Link></li>
                <li><Link className={linkClass} to="/">Contact Us</Link></li>
                <li><Link className={linkClass} to="/">Customer Support</Link></li>
              </ul>
            </div>

            <div className="w-full sm:w-auto sm:flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Legal
              </h3>
              <ul className="space-y-3">
                <li><Link className={linkClass} to="/">Terms &amp; Conditions</Link></li>
                <li><Link className={linkClass} to="/">Privacy Policy</Link></li>
                <li><Link className={linkClass} to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Always-visible compact bar: copyright + key links + expand toggle */}
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo width="120px" />
            <span className="hidden text-slate-300 sm:inline dark:text-slate-700">|</span>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} MiniBlog. All rights reserved to RAJ.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1-1.5-1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.6 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.3.2 2.3.1 2.6a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .3.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
            >
              {expanded ? 'Show less' : 'Site links'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

