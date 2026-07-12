

import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const usernamePreview = watch("username")

    const create = async (data) => {
        setError("")
        try {
            const account = await authService.createAccount(data)
            if (account) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login({ userData, username: data.username.trim().toLowerCase() }))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex w-full items-center justify-center px-4">
            <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[160px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 transition-all duration-200 hover:underline dark:text-indigo-400"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <div>
                            <Input
                                label="Username"
                                placeholder="e.g. raj_tripathi"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: { value: 3, message: "At least 3 characters" },
                                    maxLength: { value: 20, message: "At most 20 characters" },
                                    pattern: {
                                        value: /^[a-z0-9_]+$/,
                                        message: "Lowercase letters, numbers, and underscores only",
                                    },
                                })}
                            />
                            {errors.username ? (
                                <p className="mt-1 pl-1 text-xs text-red-500 dark:text-red-400">
                                    {errors.username.message}
                                </p>
                            ) : usernamePreview && (
                                <p className="mt-1 pl-1 text-xs text-slate-400 dark:text-slate-500">
                                    Your profile will show as @{usernamePreview.trim().toLowerCase()}
                                </p>
                            )}
                        </div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
