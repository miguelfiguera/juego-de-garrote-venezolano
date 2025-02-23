"use server";

import { adminDb } from "../admin/firebaseAdmin";
import { Patio } from "@/lib/interfaces/interfaces"; // Assuming your Patio interface is in this file
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PATIOS_COLLECTION = "patios"; // Define the collection name

// Collection functions

//Index for listing

export async function index(): Promise<Patio[]> {
  try {
    const snapshot = await adminDb.collection(PATIOS_COLLECTION).get();
    const patios: Patio[] = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Patio)
    );
    return patios;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching patios:", error);
      throw new Error(error.message || "Failed to fetch patios");
    } else {
      console.error("Error fetching patios:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

//Show to get specific a specific patio

export async function show(patioId: string): Promise<Patio | null> {
  try {
    const doc = await adminDb.collection(PATIOS_COLLECTION).doc(patioId).get();

    if (!doc.exists) {
      return null; // No patio found for this patioId
    }

    // Assuming there's only one patio per patioId, get the first (and only) doc
    const data = { id: doc.id, ...doc.data() } as Patio;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching patio with ID ${patioId}:`, error);
      throw new Error(
        error.message || `Error fetching patio with ID ${patioId}`
      );
    } else {
      console.error(`Error fetching patio with ID ${patioId}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

//Create to create a new patio
export async function create(
  patioData: Omit<Patio, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    const docRef = await adminDb.collection(PATIOS_COLLECTION).add({
      ...patioData,
      createdAt: now,
      updatedAt: now,
    });
    revalidatePath("/patios"); // Revalidate the patios list
    return docRef.id; // Return the new document's ID
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating patio:", error);
      throw new Error(error.message || `Error creating patio ${error}`);
    } else {
      console.error("Error creating patio:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
// To update a patio
export async function update(
  id: string,
  patioData: Omit<Patio, "id" | "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    await adminDb
      .collection(PATIOS_COLLECTION)
      .doc(id)
      .update({
        ...patioData,
        updatedAt: now,
      });
    revalidatePath(`/patios/${id}`); // Revalidate the specific patio page
    revalidatePath("/patios"); // Revalidate the patios list (if it displays updated info)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating patio with ID ${id}:`, error);
      throw new Error(error.message || `Failed to update patio with ID ${id}`);
    } else {
      console.error(`Error updating patio with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

//destroy a patio

export async function destroy(id: string): Promise<void> {
  try {
    await adminDb.collection(PATIOS_COLLECTION).doc(id).delete();
    revalidatePath("/patios"); // Revalidate the patios list
    redirect("/patios"); // Redirect back to the patios list
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting patio with ID ${id}:`, error);
      throw new Error(error.message || `Failed to delete patio with ID ${id}`);
    } else {
      console.error(`Error deleting patio with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}
