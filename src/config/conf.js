const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUsernamesCollectionId: String(import.meta.env.VITE_APPWRITE_USERNAMES_COLLECTION_ID),
    appwriteReactionsCollectionId: String(import.meta.env.VITE_APPWRITE_REACTIONS_COLLECTION_ID),
    appwriteProfilesCollectionId: String(import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID),

}


export default conf