// lib/actions/post-actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin/firebaseAdmin"; // Adjust the path as needed.
import { Post } from "@/lib/interfaces/interfaces"; // Adjust the path as needed

const POSTS_COLLECTION = "posts"; // Define your collection name

//Index to list all post

export async function index(): Promise<Post[]> {
  try {
    const snapshot = await adminDb.collection(POSTS_COLLECTION).get();
    const posts: Post[] = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Post)
    );
    return posts;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching posts:", error);
      throw new Error(error.message || "Failed to fetch posts");
    } else {
      console.error("Error fetching posts:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

//Show to get specific a specific post

export async function show(postId: string): Promise<Post | null> {
  try {
    const doc = await adminDb.collection(POSTS_COLLECTION).doc(postId).get();

    if (!doc.exists) {
      return null; // No post found for this postId
    }

    const data = { id: doc.id, ...doc.data() } as Post;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      throw new Error(error.message || `Error fetching post with ID ${postId}`);
    } else {
      console.error(`Error fetching post with ID ${postId}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

//Create to create a new post
export async function create(
  postData: Omit<Post, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    const docRef = await adminDb.collection(POSTS_COLLECTION).add({
      ...postData,
      createdAt: now,
      updatedAt: now,
    });
    revalidatePath("/publicaciones"); // Revalidate the posts list
    console.log("New post created with ID:", docRef.id);
    return docRef.id; // Return the new document's ID
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating post:", error);
      throw new Error(error.message || `Error creating post ${error}`);
    } else {
      console.error("Error creating post:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
// To update a post
export async function update(
  id: string,
  postData: Omit<Post, "id" | "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    await adminDb
      .collection(POSTS_COLLECTION)
      .doc(id)
      .update({
        ...postData,
        updatedAt: now,
      });
    revalidatePath("/publicaciones"); // Revalidate the posts list (if it displays updated info)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating post with ID ${id}:`, error);
      throw new Error(error.message || `Failed to update post with ID ${id}`);
    } else {
      console.error(`Error updating post with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

//destroy a post

export async function destroy(id: string): Promise<void> {
  try {
    await adminDb.collection(POSTS_COLLECTION).doc(id).delete();
    revalidatePath("/publicaciones"); // Revalidate the posts list
    //redirect("/posts"); // Redirect back to the posts list
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw new Error(error.message || `Failed to delete post with ID ${id}`);
    } else {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}
