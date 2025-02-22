import { create } from "zustand";

interface SessionState {
  userUid: string | null;
  session: boolean;
  setUserUid: (uid: string | null) => void;
  setSession: (status: boolean) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  userUid: null,
  session: false,
  setUserUid: (uid) => set({ userUid: uid }),
  setSession: (status) => set({ session: status }),
}));

export default useSessionStore;
