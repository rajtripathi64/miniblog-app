// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}) {
    
    
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                 className='rounded-xl' />

//             </div>
//             <h2
//             className="text-lg font-semibold text-gray-800 hover:text-gray-500"
//             >{title || "No title Found"}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard

import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShareButton from './ShareButton'

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

function PostCard({ $id, title, featuredImage, userId }) {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)
  const authUserData = useSelector((state) => state.auth.userData)
  const isAuthor = Boolean(authUserData && userId === authUserData.$id)

  const goToPost = () => navigate(`/post/${$id}`)

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit-post/${$id}`)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (deleting) return
    const confirmed = window.confirm('Delete this post? This cannot be undone.')
    if (!confirmed) return

    setDeleting(true)
    const post = await appwriteService.getPost($id)
    const removed = await appwriteService.deletePost($id)
    if (removed) {
      if (post?.featuredImage) {
        appwriteService.deleteFile(post.featuredImage)
      }
      window.location.reload()
    } else {
      setDeleting(false)
    }
  }

  return (
    <div
      onClick={goToPost}
      onKeyDown={(e) => {
        if (e.key === 'Enter') goToPost()
      }}
      role="link"
      tabIndex={0}
      className="group block h-full cursor-pointer"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover toolbar: Edit/Delete for the author, Share for everyone */}
          {/* <div className="absolute right-2 top-2 flex gap-1.5 opacity-0.5 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100"> */}
            {isAuthor && (
              
               <div className="absolute left-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={handleEdit}
                  aria-label="Edit post"
                  title="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-sm backdrop-blur hover:bg-white dark:bg-slate-900/90 dark:text-emerald-400 dark:hover:bg-slate-900"
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  aria-label="Delete post"
                  title="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur hover:bg-white disabled:opacity-50 dark:bg-slate-900/90 dark:text-red-400 dark:hover:bg-slate-900"
                >
                  <TrashIcon />
                </button>
              </div>
            )}
            {/* <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
  
              <ShareButton
                url={typeof window !== 'undefined' ? `${window.location.origin}/post/${$id}` : ''}
                title={title}
                buttonClassName="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900"
            />
            </div> */}
         
        </div>
        <div className="flex flex-col p-2">
          <h2 className="line-clamp-2 text-lg font-bold text-slate-900  dark:text-white ">
            {title}
          </h2>
          <span className="mt-auto pt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Read more &rarr;
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostCard