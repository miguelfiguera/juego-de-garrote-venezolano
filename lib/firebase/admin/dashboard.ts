import { adminDb } from "../admin/firebaseAdmin";
import {
  Investigation,
  Patio,
  Post,
  Profile,
  Publication,
} from "@/lib/interfaces/interfaces";

const INVESTIGATIONS_COLLECTION = "investigations";
const PATIOS_COLLECTION = "patios";
const POSTS_COLLECTION = "posts";
const PROFILES_COLLECTION = "profiles";
const PUBLICATIONS_COLLECTION = "publications";

interface DashboardData {
  investigations: Investigation[];
  patios: Patio[];
  posts: Post[];
  profiles: Profile[];
  publications: Publication[];
}

export const getDashboardData = async (): Promise<DashboardData | null> => {
  try {
    // Get all documents from all the collections
    const investigationsSnapshot = await adminDb
      .collection(INVESTIGATIONS_COLLECTION)
      .get();
    const patiosSnapshot = await adminDb.collection(PATIOS_COLLECTION).get();
    const postsSnapshot = await adminDb.collection(POSTS_COLLECTION).get();
    const profilesSnapshot = await adminDb
      .collection(PROFILES_COLLECTION)
      .get();
    const publicationsSnapshot = await adminDb
      .collection(PUBLICATIONS_COLLECTION)
      .get();

    // Extract the data from the documents
    const investigations = investigationsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Investigation)
    );
    const patios = patiosSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Patio)
    );
    const posts = postsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Post)
    );
    const profiles = profilesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Profile)
    );
    const publications = publicationsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Publication)
    );

    const dashboardData = {
      investigations: investigations,
      patios: patios,
      posts: posts,
      profiles: profiles,
      publications: publications,
    };

    return dashboardData;
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    return null;
  }
};
