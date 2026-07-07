import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn({ className = '' }) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className={`rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 duration-200 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40 ${className}`}
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn