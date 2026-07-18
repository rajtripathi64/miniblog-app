

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
 
