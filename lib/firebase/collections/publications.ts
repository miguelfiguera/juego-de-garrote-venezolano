// lib/actions/publication-actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { adminDb } from "../admin/firebaseAdmin";
import { Publication } from "@/lib/interfaces/interfaces";
const PUBLICATIONS_COLLECTION = "publications"; // Define your collection name

// Index to list all Publications
export async function index(): Promise<Publication[]> {
  try {
    const snapshot = await adminDb.collection(PUBLICATIONS_COLLECTION).get();
    const publications: Publication[] = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Publication)
    );
    return publications;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching publications:", error);
      throw new Error(error.message || "Failed to fetch publications");
    } else {
      console.error("Error fetching publications:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Show to get a specific Publication
export async function show(publicationId: string): Promise<Publication | null> {
  try {
    const doc = await adminDb
      .collection(PUBLICATIONS_COLLECTION)
      .doc(publicationId)
      .get();

    if (!doc.exists) {
      return null; // No publication found for this publicationId
    }

    const data = { id: doc.id, ...doc.data() } as Publication;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error fetching publication with ID ${publicationId}:`,
        error
      );
      throw new Error(
        error.message || `Error fetching publication with ID ${publicationId}`
      );
    } else {
      console.error(
        `Error fetching publication with ID ${publicationId}:`,
        error
      );
      throw new Error("An unknown error occurred");
    }
  }
}

// Create to create a new Publication
export async function create(
  publicationData: Omit<Publication, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    const docRef = await adminDb.collection(PUBLICATIONS_COLLECTION).add({
      ...publicationData,
      createdAt: now,
      updatedAt: now,
    });
    revalidatePath("/publicaciones"); // Revalidate the publications list
    console.log("New publication created with ID:", docRef.id);
    return docRef.id; // Return the new document's ID
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating publication:", error);
      throw new Error(error.message || `Error creating publication`);
    } else {
      console.error("Error creating publication:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Update to update an existing Publication
export async function update(
  id: string,
  publicationData: Omit<Publication, "id" | "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    await adminDb
      .collection(PUBLICATIONS_COLLECTION)
      .doc(id)
      .update({
        ...publicationData,
        updatedAt: now,
      });
    revalidatePath("/publicaciones"); // Revalidate the publications list
    revalidatePath(`/publicaciones/${id}`); // Revalidate the specific publication detail page (if applicable)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating publication with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to update publication with ID ${id}`
      );
    } else {
      console.error(`Error updating publication with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Destroy to delete a Publication
export async function destroy(id: string): Promise<void> {
  try {
    await adminDb.collection(PUBLICATIONS_COLLECTION).doc(id).delete();
    revalidatePath("/publicaciones"); // Revalidate the publications list
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting publication with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to delete publication with ID ${id}`
      );
    } else {
      console.error(`Error deleting publication with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}
