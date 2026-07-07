import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
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
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

     return post ? (
        <div className="py-8">
            <Container>
                <div className="relative mx-auto mb-4 flex w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-900">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="max-h-[460px] w-full object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-300 hover:bg-green-700">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mb-2 w-full">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
                </div>
                <div className=" max-w-4xl mx-auto browser-css text-slate-700 dark:text-slate-300">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}