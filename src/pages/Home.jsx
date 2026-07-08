// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
// import {Container, PostCard} from '../components'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
                
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home

import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (!authStatus) {
            // Logged out: immediately clear whatever was fetched before,
            // instead of waiting for a full page refresh.
            setPosts([])
            setLoading(false)
            return
        }

        setLoading(true)
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setLoading(false))
    }, [authStatus])

    if (loading) {
        return (
            <div className="w-full py-10">
                <Container>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-20">
                <Container>
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                                <path d="M12 19c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8Z" />
                                <path d="M12 9v4M12 16h.01" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Log in to read posts
                        </h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Create a free account to start reading and writing on MiniBlog.
                        </p>
                        <Link
                            to="/login"
                            className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            Go to Login
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-10">
            <Container>
                <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Latest Posts
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
