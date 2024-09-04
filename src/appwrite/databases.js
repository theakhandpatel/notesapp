import { databases } from "./config";
import { ID } from "appwrite";

const collections = [
  {
    name: "notes",
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
]
const db = {};

collections.forEach((collection) => {
  db[collection.name] = {
    create: async (payload, id = ID.unique()) => {
      return await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        payload,
      )
    },
    update: async (id, payload) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        payload,
      )
    },
    delete: async (id) => {
      return await databases.deleteDocument(
        collection.dbId,
        collection.id,
        id,
      )
    },
    get: async (id) => {
      return await databases.getDocument(
        collection.dbId,
        collection.id,
        id,
      )
    },
    list: async (queries)=>{
      return await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries,
      )
    }, 
  }
});

export { db };