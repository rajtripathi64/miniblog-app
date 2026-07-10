import conf from '../config/conf.js';
import { Client, Databases, Query, ID, Permission, Role } from "appwrite";

export class ReactionService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // All reactions for a single post (used to compute counts).
    async getReactionsForPost(postId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteReactionsCollectionId,
                [Query.equal("postId", postId), Query.limit(200)]
            );
            return result.documents;
        } catch (error) {
            console.log("Appwrite service :: getReactionsForPost :: error", error);
            return [];
        }
    }

    // Finds this user's existing reaction document on a post, if any.
    async getMyReaction(postId, userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteReactionsCollectionId,
                [Query.equal("postId", postId), Query.equal("userId", userId)]
            );
            return result.documents[0] || null;
        } catch (error) {
            console.log("Appwrite service :: getMyReaction :: error", error);
            return null;
        }
    }

    // Sets/changes/removes a user's reaction on a post:
    // - no existing reaction -> creates one
    // - existing reaction, different emoji -> updates it
    // - existing reaction, same emoji -> removes it (toggle off)
    async setReaction(postId, userId, emoji) {
        try {
            const existing = await this.getMyReaction(postId, userId);

            if (existing) {
                if (existing.emoji === emoji) {
                    await this.databases.deleteDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteReactionsCollectionId,
                        existing.$id
                    );
                    return null;
                }

                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteReactionsCollectionId,
                    existing.$id,
                    { emoji }
                );
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteReactionsCollectionId,
                ID.unique(),
                { postId, userId, emoji },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: setReaction :: error", error);
            return null;
        }
    }
}

const reactionService = new ReactionService();

export default reactionService;
