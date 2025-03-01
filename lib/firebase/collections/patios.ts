"use server";

import { adminDb } from "../admin/firebaseAdmin";
import { Patio } from "@/lib/interfaces/interfaces"; // Assuming your Patio interface is in this file
import { revalidatePath } from "next/cache";

const PATIOS_COLLECTION = "patios"; // Define the collection name
const PROFILES_COLLECTION = "profiles"; //Define profile collection too

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

    const profileToUpdate = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", patioData.masterId)
      .limit(1)
      .get();

    if (profileToUpdate.empty) {
      throw new Error("Profile not found for user");
    }

    const profileId = profileToUpdate.docs[0].id;

    const profileUpdate = await adminDb
      .collection(PROFILES_COLLECTION)
      .doc(profileId)
      .update({
        patioId: docRef.id,
        patioStatus: "approved",
      });

    if (!profileUpdate) {
      throw new Error("Failed to update profile");
    }

    revalidatePath("/patios"); // Revalidate the patios list
    console.log("New patio created with ID:", docRef.id);
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
    //redirect("/patios"); // Redirect back to the patios list
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

//ask to join a patio
export async function joinPatio(
  patioId: string,
  userId: string
): Promise<void> {
  try {
    const profile = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", userId)
      .limit(1)
      .get();
    if (profile.empty) {
      throw new Error("Profile not found for user");
    }
    const id = profile.docs[0].id;

    const thePatio = await adminDb
      .collection(PATIOS_COLLECTION)
      .doc(patioId)
      .get();
    const patio = { id: thePatio.id, ...thePatio.data() } as Patio;

    await adminDb.collection(PROFILES_COLLECTION).doc(id).update({
      patioId: patioId,
      patioStatus: "pending",
      masterId: patio.masterId,
    });
    revalidatePath(`/profiles/${id}`); // Revalidate the specific profile page
    revalidatePath("/profiles"); // Revalidate the profiles list (if it displays updated info)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error joining patio with ID ${patioId}:`, error);
      throw new Error(
        error.message || `Failed to joining patio with ID ${patioId}`
      );
    } else {
      console.error(`Error joining patio with ID ${patioId}:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

//leave patio

export async function leavePatio(userId: string): Promise<void> {
  try {
    const profile = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", userId)
      .limit(1)
      .get();
    if (profile.empty) {
      throw new Error("Profile not found for user");
    }
    const id = profile.docs[0].id;
    await adminDb.collection(PROFILES_COLLECTION).doc(id).update({
      patioId: null,
      patioStatus: null,
      masterId: null,
    });
    revalidatePath(`/profiles/${id}`); // Revalidate the specific profile page
    revalidatePath("/profiles"); // Revalidate the profiles list (if it displays updated info)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error leaving patio with :`, error);
      throw new Error(error.message || `Failed to leaving patio`);
    } else {
      console.error(`Error joining leaving patio:`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function accepted(userUid: string): Promise<void> {
  try {
    const profile = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", userUid)
      .limit(1)
      .get();
    if (profile.empty) {
      throw new Error("Profile not found for user");
    }
    const patioId = profile.docs[0].data().patioId;
    const id = profile.docs[0].id;
    await adminDb.collection(PROFILES_COLLECTION).doc(id).update({
      patioStatus: "approved",
    });
    revalidatePath(`/admin/patios/${patioId}`); // Revalidate the specific profile page
    revalidatePath(`/patios/${patioId}`); // Revalidate the profiles list (if it displays updated info)
  } catch {
    throw new Error("An unknown error occurred");
  }
}

export async function rejected(userUid: string): Promise<void> {
  try {
    const profile = await adminDb
      .collection(PROFILES_COLLECTION)
      .where("userId", "==", userUid)
      .limit(1)
      .get();
    if (profile.empty) {
      throw new Error("Profile not found for user");
    }
    const patioId = profile.docs[0].data().patioId;
    const id = profile.docs[0].id;
    await adminDb.collection(PROFILES_COLLECTION).doc(id).update({
      patioStatus: "rejected",
      patioId: null,
      masterId: null,
    });
    revalidatePath(`/admin/patios/${patioId}`); // Revalidate the specific profile page
    revalidatePath(`/patios/${patioId}`); // Revalidate the profiles list (if it displays updated info)
  } catch {
    throw new Error("An unknown error occurred");
  }
}
