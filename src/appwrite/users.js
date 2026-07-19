import conf from '../config/conf.js';
import { Client, Databases, Query } from "appwrite";

export class UserService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // Resolves a username to its full record (userId, username, name).
    // Since the username IS the document ID in this collection, this is a
    // direct getDocument lookup - no querying needed. Returns null if no
    // such username exists, rather than throwing, so callers can render a
    // clean "not found" state.
    async getUserByUsername(username) {
        const id = String(username || "").trim().toLowerCase();
        if (!id) return null;

        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsernamesCollectionId,
                id
            );
        } catch (error) {
            return null;
        }
    }

    // Searches the usernames collection by username OR name.
    // Query.search() only matches ONE attribute at a time, so this searches
    // against `searchIndex` - a combined field (username + name) created
    // specifically to make single-term search work across both.
    // Returns an array of { userId, username, name } results.
    async searchUsers(term) {
        const query = String(term || "").trim();

        if (!query) {
            return [];
        }

        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUsernamesCollectionId,
                [
                    Query.search("searchIndex", query),
                    Query.limit(10),
                ]
            );
            return result.documents;
        } catch (error) {
            console.log("Appwrite service :: searchUsers :: error", error);
            return [];
        }
    }
}

const userService = new UserService();

export default userService;
