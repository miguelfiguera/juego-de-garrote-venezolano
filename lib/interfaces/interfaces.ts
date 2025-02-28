import { Timestamp } from "firebase/firestore";

// Helper type to make fields optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Users
export interface User {
  id: string; // Firestore document ID
  username: string;
  email: string;
  digestPassword?: string; // Store hash, not plain password
  createdAt: Timestamp | number; // Firebase Timestamp or milliseconds
  updatedAt: Timestamp | number;
}

// Admins
export interface Admin {
  id: string; // Firestore document ID
  email: string;
  digestPassword?: string; // Store hash, not plain password
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Profiles
export interface Profile {
  id: string; // Firestore document ID
  name?: string;
  lastname?: string;
  address?: string;
  age?: number;
  status?: string;
  role?: "aprendiz" | "instructor" | "maestro";
  yearsInTheGame?: number;
  biography?: string;
  zipcode?: string;
  phone?: string;
  email?: string;
  style?: string;
  userId: string; // Reference to User (Firestore document ID)
  masterId?: string | null; // Optional reference to User (Firestore document ID)
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
  nationalIdNumber: string; // Added nationalIdNumber
  photoUrl?: string;
  country?: string;
  disabled?: boolean;
  patioId?: string | null;
  patioStatus?: "pending" | "approved" | "denied" | null;
}

// Patios
export interface Patio {
  id: string; // Firestore document ID
  masterId: string; // Reference to User (Firestore document ID) - Master
  masterName: string;
  photoUrl: string;
  name: string;
  address: string;
  zipCode: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Items
export interface Item {
  id: string; // Firestore document ID
  itemName: string;
  price: number; // Using number for decimal (Firebase doesn't have decimal type)
  userId: string; // Reference to User (Firestore document ID)
  quantity: number;
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Carts
export interface Cart {
  id: string; // Firestore document ID
  userId: string; // Reference to User (Firestore document ID)
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// CartItems
export interface CartItem {
  id: string; // Firestore document ID
  itemId: string; // Reference to Item (Firestore document ID)
  cartId: string; // Reference to Cart (Firestore document ID)
  quantity: number;
  status: "pending" | "payed"; // Enum
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Publications
export interface Publication {
  id: string; // Firestore document ID
  adminId: string; // Reference to Admin (Firestore document ID)
  title: string;
  review: string;
  authorName?: string;
  originalUrl?: string;
  file?: string; // Assuming you store the file URL in Firebase Storage
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

export interface Investigation {
  id: string; // Firestore document ID
  investigatorId: string; // Reference to Admin (Firestore document ID)
  investigatorName: string;
  title: string;
  review: string;
  originalUrl?: string;
  file?: string; // Assuming you store the file URL in Firebase Storage
  status:
    | "pending"
    | "payed"
    | "canceled"
    | "publication"
    | "funding"
    | "complete";
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Posts
export interface Post {
  id: string; // Firestore document ID
  userId: string; // Reference to User (Firestore document ID)
  authorName: string;
  title: string;
  resume: string;
  text: string;
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// Comments
export interface Comment {
  id: string; // Firestore document ID
  userId: string; // Reference to User (Firestore document ID)
  postId: string; // Reference to Post (Firestore document ID)
  text: string;
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

// CheckOutBills
export interface CheckOutBill {
  id: string; // Firestore document ID
  cartId: string; // Reference to Cart (Firestore document ID)
  amount: number;
  status: "pending" | "payed" | "canceled" | "error"; // Enum
  createdAt: Timestamp | number;
  updatedAt: Timestamp | number;
}

//firebase customClaims interface to handle user permissions and actions
export interface Claims {
  admin: boolean;
  master: boolean;
  blogger: boolean;
  seller: boolean;
  investigator: boolean;
  jugador: boolean;
}
