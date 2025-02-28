// lib/actions/investigation-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "../admin/firebaseAdmin";
import { Investigation } from "@/lib/interfaces/interfaces";

const INVESTIGATIONS_COLLECTION = "investigations"; // Define your collection name

// Index to list all Investigations
export async function index(): Promise<Investigation[]> {
  try {
    const snapshot = await adminDb.collection(INVESTIGATIONS_COLLECTION).get();
    const investigations: Investigation[] = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Investigation)
    );
    return investigations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching investigations:", error);
      throw new Error(error.message || "Failed to fetch investigations");
    } else {
      console.error("Error fetching investigations:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Show to get a specific Investigation
export async function show(
  investigationId: string
): Promise<Investigation | null> {
  try {
    const doc = await adminDb
      .collection(INVESTIGATIONS_COLLECTION)
      .doc(investigationId)
      .get();

    if (!doc.exists) {
      return null; // No investigation found for this investigationId
    }

    const data = { id: doc.id, ...doc.data() } as Investigation;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error fetching investigation with ID ${investigationId}:`,
        error
      );
      throw new Error(
        error.message ||
          `Error fetching investigation with ID ${investigationId}`
      );
    } else {
      console.error(
        `Error fetching investigation with ID ${investigationId}:`,
        error
      );
      throw new Error("An unknown error occurred");
    }
  }
}

// Create to create a new Investigation
export async function create(
  investigationData: Omit<Investigation, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    const docRef = await adminDb.collection(INVESTIGATIONS_COLLECTION).add({
      ...investigationData,
      createdAt: now,
      updatedAt: now,
    });
    revalidatePath("/investigaciones"); // Revalidate the investigations list
    console.log("New investigation created with ID:", docRef.id);
    return docRef.id; // Return the new document's ID
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating investigation:", error);
      throw new Error(error.message || `Error creating investigation`);
    } else {
      console.error("Error creating investigation:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Update to update an existing Investigation
export async function update(
  id: string,
  investigationData: Omit<
    Investigation,
    "createdAt" | "updatedAt" | "investigatorId" | "investigatorName"
  >
): Promise<void> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    await adminDb
      .collection(INVESTIGATIONS_COLLECTION)
      .doc(id)
      .update({
        ...investigationData,
        updatedAt: now,
      });
    revalidatePath("/investigaciones"); // Revalidate the investigations list
    revalidatePath(`/investigaciones/${id}`); // Revalidate the specific investigation detail page (if applicable)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating investigation with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to update investigation with ID ${id}`
      );
    } else {
      console.error(`Error updating investigation with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Destroy to delete an Investigation
export async function destroy(id: string): Promise<void> {
  try {
    await adminDb.collection(INVESTIGATIONS_COLLECTION).doc(id).delete();
    revalidatePath("/investigaciones"); // Revalidate the investigations list
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting investigation with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to delete investigation with ID ${id}`
      );
    } else {
      console.error(`Error deleting investigation with ID ${id}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}
