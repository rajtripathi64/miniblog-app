import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(async (userData) => {
      if (userData) {
        const username = await authService.getUsernameByUserId(userData.$id)
        dispatch(login({userData, username}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='flex min-h-screen flex-col bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App