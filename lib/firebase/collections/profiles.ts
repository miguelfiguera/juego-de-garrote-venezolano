"use server";

import { adminDb } from "../admin/firebaseAdmin";
import { Profile } from "@/lib/interfaces/interfaces";
import { revalidatePath } from "next/cache";

const PROFILES_COLLECTION = "profiles"; // Define the collection name

// Collection functions

//Index for listing

export async function index(): Promise<Profile[]> {
  try {
    const snapshot = await adminDb.collection(PROFILES_COLLECTION).get();
    const profiles: Profile[] = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Profile)
    );
    return profiles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profiles");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

//Show to get specific a specific profile

export async function show(userId: string): Promise<Profile | null> {
  try {
    const snapshot = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null; // No profile found for this userId
    }

    // Assuming there's only one profile per userId, get the first (and only) doc
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Profile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching profile for userId ${userId}:`, error);
      throw new Error(
        error.message || `Error fetching profile for userId ${userId}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

//Create to create a new profile
export async function create(
  profileData: Omit<Profile, "id" | "createdAt" | "updatedAt" | "disabled">
): Promise<string> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    const docRef = await adminDb.collection(PROFILES_COLLECTION).add({
      ...profileData,
      disabled: false,
      createdAt: now,
      updatedAt: now,
    });
    revalidatePath("/profile"); // Revalidate the profiles list
    return docRef.id; // Return the new document's ID
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating profile:", error);
      throw new Error(error.message || `Error creating profile ${error}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
// To update a profile
export async function update(
  id: string,
  profileData: Omit<Profile, "id" | "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const now = Date.now(); // Use milliseconds for timestamp
    await adminDb
      .collection(PROFILES_COLLECTION)
      .doc(id)
      .update({
        ...profileData,
        updatedAt: now,
      });
    revalidatePath(`/profile`); // Revalidate the specific profile page
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating profile with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to update profile with ID ${id}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

//destroy a profile

export async function destroy(id: string): Promise<void> {
  try {
    await adminDb.collection(PROFILES_COLLECTION).doc(id).delete();
    //revalidatePath("/profile"); // Revalidate the profiles list
    //redirect("/profile"); // Redirect back to the profiles list
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting profile with ID ${id}:`, error);
      throw new Error(
        error.message || `Failed to delete profile with ID ${id}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
