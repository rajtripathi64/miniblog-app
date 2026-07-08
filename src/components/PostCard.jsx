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
import { PencilIcon, TrashIcon } from './icons/PostActionBtn'
import AuthorHeader from './AuthorHeader'
// import ShareButton from './ShareButton'


function PostCard({ $id, title, featuredImage, userId, userName }) {
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
        
        {userName && (
          <div className="px-3 pt-3">
            <AuthorHeader userName={userName} />
          </div>
        )}
        
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
          {userName && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              by {userName}
            </p>
          )}
          <span className="mt-auto pt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Read more &rarr;
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostCard