// import conf from '../config/conf.js';
// import { Client, Account, ID } from "appwrite";


// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
            
//     }

//     async createAccount({email, password, name}) {
//         try {
//             const userAccount = await this.account.create(ID.unique(), email, password, name);
//             if (userAccount) {
//                 // call another method
//                 return this.login({email, password});
//             } else {
//                return  userAccount;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async login({email, password}) {
//         try {
//             return await this.account.createEmailPasswordSession(email, password);
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.log("Appwrite serive :: getCurrentUser :: error", error);
//         }

//         return null;
//     }

//     async logout() {

//         try {
//             await this.account.deleteSessions();
//         } catch (error) {
//             console.log("Appwrite serive :: logout :: error", error);
//         }
//     }
// }

// const authService = new AuthService();

// export default authService

import conf from '../config/conf.js';
import { Client, Account, Databases, Query, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);

    }

    // Normalizes a raw username input into the exact string we store as the
    // document ID: lowercase, letters/numbers/underscores only.
    normalizeUsername(raw) {
        return String(raw || "").trim().toLowerCase();
    }

    async isUsernameAvailable(username) {
        const id = this.normalizeUsername(username);
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsernamesCollectionId,
                id
            );
            // Document exists -> username is taken
            return false;
        } catch (error) {
            // Appwrite throws a 404-style error when the document doesn't exist,
            // which is exactly what "available" looks like.
            return true;
        }
    }

    // Reserves a username by creating a document whose ID *is* the username.
    // Appwrite will reject this if that ID already exists, which is what
    // gives us race-condition-proof uniqueness.
    async reserveUsername(username, userId) {
        const id = this.normalizeUsername(username);
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUsernamesCollectionId,
            id,
            { userId }
        );
    }

    // Looks up the username belonging to a given Auth user ID.
    async getUsernameByUserId(userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUsernamesCollectionId,
                [Query.equal("userId", userId)]
            );
            if (result.documents.length > 0) {
                return result.documents[0].$id; // the document ID IS the username
            }
            return null;
        } catch (error) {
            console.log("Appwrite service :: getUsernameByUserId :: error", error);
            return null;
        }
    }

    async createAccount({email, password, name, username}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (!userAccount) {
                return userAccount;
            }

            // Log in immediately so we're authenticated for the username reservation
            await this.login({email, password});

            try {
                await this.reserveUsername(username, userAccount.$id);
            } catch (reserveError) {
                // Username was taken (or reservation failed for another reason).
                // Roll back the account we just created so we don't leave an
                // orphaned account with no username attached.
                try {
                    await this.account.delete();
                } catch (rollbackError) {
                    console.log("Appwrite service :: createAccount :: rollback failed", rollbackError);
                }
                throw new Error("That username is already taken. Please choose another.");
            }

            return await this.getCurrentUser();
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
