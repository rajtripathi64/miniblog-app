// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await appwriteService.uploadFile(data.image[0]);
            

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 const dbPost = await appwriteService.createPost({
//                     ...data,
//                     userId: userData.$id,
//                     userName: userData.name,
//                 });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 lg:flex-row">
//             <div className="w-full space-y-4 lg:w-2/3">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-full space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 lg:w-1/3">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="w-full object-cover"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-600 hover:bg-green-700" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const username = useSelector((state) => state.auth.username);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    userName: username || userData.name,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 lg:flex-row">
            <div className="w-full space-y-4 lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-600 hover:bg-green-700" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}