// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//      return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="relative mx-auto mb-4 flex w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-900">
//                     <img
//                         src={appwriteService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="max-h-[460px] w-full object-contain"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6 flex gap-2">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-300 hover:bg-green-700">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-2 w-full">
//                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
//                 </div>
//                 <div className=" max-w-4xl mx-auto browser-css text-slate-700 dark:text-slate-300">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, ShareButton, AuthorHeader } from "../components";
import { PencilIcon, TrashIcon } from "../components/icons/PostActionBtn";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Reactions from "../components/Reactions";

export default function Post() {
    const [post, setPost] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (deleting) return;
        const confirmed = window.confirm("Delete this post? This cannot be undone.");
        if (!confirmed) return;

        setDeleting(true);
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            } else {
                setDeleting(false);
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {post.userName && (
                    <div className="mx-auto mb-3 w-full max-w-2xl">
                        <AuthorHeader userName={post.userName} />
                    </div>
                )}
                <div className="relative mx-auto mb-6 flex w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="max-h-[480px] w-full object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute left-3 top-3 flex gap-1.5">
                            <button
                                type="button"
                                onClick={() => navigate(`/edit-post/${post.$id}`)}
                                aria-label="Edit post"
                                title="Edit"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-sm backdrop-blur hover:bg-white dark:bg-slate-900/90 dark:text-emerald-400 dark:hover:bg-slate-900"
                            >
                                <PencilIcon />
                            </button>
                            <button
                                type="button"
                                onClick={deletePost}
                                disabled={deleting}
                                aria-label="Delete post"
                                title="Delete"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur hover:bg-white disabled:opacity-50 dark:bg-slate-900/90 dark:text-red-400 dark:hover:bg-slate-900"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    )}

                    <div className="absolute right-3 top-3">
                        <ShareButton
                            url={typeof window !== "undefined" ? window.location.href : ""}
                            title={post.title}
                            buttonClassName="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900"
                        />
                    </div>
                </div>
               <div className="mx-auto mb-6 w-full max-w-2xl">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
                    <Reactions postId={post.$id} className="mt-3" />
                </div>
                <div className="browser-css mx-auto w-full max-w-2xl text-slate-700 dark:text-slate-300">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
