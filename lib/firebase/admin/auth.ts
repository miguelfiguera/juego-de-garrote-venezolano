"use server";
import { adminAuth } from "@/lib/firebase/admin/firebaseAdmin";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { cookies } from "next/headers";
import { Profile } from "@/lib/interfaces/interfaces";
import { Claims } from "@/lib/interfaces/interfaces";
import { revalidatePath } from "next/cache";

// This are the main functions to create users and modify users.

//search user by email to check if it exists
export const searchUserByEmail = async (email: string) => {
  const user = await adminAuth.getUserByEmail(email);
  if (user) {
    console.log("User already exists:", email);
    return user.uid;
  }
  return false;
};

//creation of user
export const createUser = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  //receive email and password from client and connects to firebase to create
  // a new user in a async function.
  try {
    //creates user
    const userCredential = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: name + " " + lastName,
    });
    adminAuth.setCustomUserClaims(userCredential.uid, {
      admin: false,
      master: false,
      blogger: false,
      seller: false,
      investigator: false,
      jugador: true,
    });
    console.log("Successfully created new user:", userCredential);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

//get custom claims

export const getUserCustomClaims = async (uid: string) => {
  try {
    const user = await adminAuth.getUser(uid);
    console.log("Successfully got custom claims:", user.customClaims);
    return user.customClaims as Claims;
  } catch (error) {
    console.error("Error getting custom claims:", error);
    return null;
  }
};

// modify customClaims so each user can add public roles
export const modifyCustomClaims = async (uid: string, claims: Claims) => {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
    revalidatePath("/profile");
    return true;
  } catch (error) {
    console.error("Error modifying custom claims:", error);
    return false;
  }
};

export const modifyCustomClaimsAdmin = async (
  uid: string,
  claims: Pick<Claims, "admin" | "master" | "blogger">
) => {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
    revalidatePath("/profile");
    return true;
  } catch (error) {
    console.error("Error modifying custom claims:", error);
    return false;
  }
};
//get all users

export const getAllUsers = async () => {
  try {
    const users = await adminAuth.listUsers(1000);
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    return null;
  }
};

//Update User (including password changes)
export const updateUser = async (uid: string, data: Profile) => {
  try {
    await adminAuth.updateUser(uid, data);
    console.log("Successfully updated user:", uid);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

//Disable User - deletion should be discussed first.
export const deleteUser = async (uid: string) => {
  try {
    await adminAuth.updateUser(uid, { disabled: true });
    console.log("Successfully deleted user:", uid);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

//createAdmin

export const createAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await adminAuth.createUser({
      email: email,
      password: password,
    });
    console.log("Successfully created new user:", userCredential.uid);
    adminAuth.setCustomUserClaims(userCredential.uid, {
      admin: true,
    });
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

//Promote To admin function

export const promoteToAdmin = async (uid: string) => {
  try {
    await adminAuth.setCustomUserClaims(uid, {
      admin: true,
    });
    console.log("Successfully promoted user to admin:", uid);
    return true;
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return false;
  }
};

//Login User

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await user.user.getIdToken();
    const expirationTime = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expirationTime,
    });

    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expirationTime,
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
    };
    cookies().set(options);
    console.log("Successfully logged in user:", user.user);
    signOut(auth);
    return true;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

// securityCheck for login

export const securityCheck = async () => {
  try {
    const session = cookies().get("session");
    if (!session) {
      return false;
    }

    // checks authentication of token
    const decodedToken = await adminAuth.verifySessionCookie(
      session.value,
      true
    );
    if (!decodedToken) {
      return false;
    }

    const user = await adminAuth.getUser(decodedToken.uid);
    const parsed = user.toJSON();
    return { parsed, valid: true };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// logOut function to kill the session cookie
export const logoutUser = async () => {
  try {
    const session = cookies().get("session");

    if (session) {
      // Revoke the user's refresh token on firebase backend
      await adminAuth.revokeRefreshTokens(session.value);
      // kill the cookie on the client to kill the session
      const options = {
        name: "session",
        value: "",
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "strict" as const,
      };
      cookies().set(options);
    }

    console.log("Session terminated.");
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    return false;
  }
};

// Get user ID from cookie
export const getUserIdFromCookie = async () => {
  try {
    const session = cookies().get("session");
    if (!session) {
      return null;
    }
    const decodedToken = await adminAuth.verifySessionCookie(
      session.value,
      true
    );
    if (!decodedToken) {
      return null;
    }
    return decodedToken.uid;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
