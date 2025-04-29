import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);



const database = new Databases(client);

export const updateSearchCount = async(query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("SEARCHTERM", query),
        ]);

        console.log(result)
    
        if (result.documents.length > 0) {
          const existingMovie = result.documents[0];
          await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
              COUNT: existingMovie.COUNT + 1,
            }
          );
        } else {
          await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            SEARCHTERM: query,
            MOVIE_ID: movie.id,
            TITLE: movie.title,
            COUNT: 1,
            POSTER_URL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          });
        }
      } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
      }

    //if a document is found increment the SEARCHCOUNT field
    // if no document is found c
        // create a new document in the db




}