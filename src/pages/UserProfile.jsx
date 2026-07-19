import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Query } from 'appwrite'
import userService from '../appwrite/users'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function SkeletonCard() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
        </div>
    )
}

function UserProfile() {
    const { username } = useParams()

    // "loading" | "not-found" | "ready"
    const [status, setStatus] = useState('loading')
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        let cancelled = false

        setStatus('loading')
        setProfile(null)
        setPosts([])

        userService.getUserByUsername(username).then(async (userRecord) => {
            if (cancelled) return

            if (!userRecord) {
                setStatus('not-found')
                return
            }

            setProfile(userRecord)

            const result = await appwriteService.getPosts([
                Query.equal('status', 'active'),
                Query.equal('userId', userRecord.userId),
            ])

            if (cancelled) return

            setPosts(result ? result.documents : [])
            setStatus('ready')
        })

        // If the username in the URL changes again before this finishes,
        // ignore the now-stale result instead of overwriting newer state.
        return () => {
            cancelled = true
        }
    }, [username])

    if (status === 'not-found') {
        return (
            <div className="w-full py-20">
                <Container>
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                                <path d="m3 3 18 18" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            User not found
                        </h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            No one goes by @{username} here.
                        </p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            Back to Home
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-10">
            <Container>
                {/* Profile header */}
                <div className="mb-8 flex items-center gap-4">
                    {status === 'loading' ? (
                        <>
                            <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                            <div className="space-y-2">
                                <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white">
                                {profile.username?.charAt(0).toUpperCase()}
                            </span>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                    @{profile.username}
                                </h1>
                                {profile.name && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {profile.name}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Posts grid */}
                {status === 'loading' && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {status === 'ready' && posts.length === 0 && (
                    <p className="py-10 text-center text-slate-500 dark:text-slate-400">
                        @{profile.username} hasn't posted anything yet.
                    </p>
                )}

                {status === 'ready' && posts.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default UserProfile
