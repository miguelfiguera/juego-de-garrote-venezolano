import { create } from "zustand";

interface SessionState {
  userUid: string | null;
  session: boolean;
  patioId: string | null;
  profileId: string | null;
  setUserUid: (uid: string | null) => void;
  setSession: (status: boolean) => void;
  setPatioId: (id: string | null) => void;
  setProfileId: (id: string | null) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  userUid: null,
  session: false,
  patioId: null,
  profileId: null,
  setUserUid: (uid) => set({ userUid: uid }),
  setSession: (status) => set({ session: status }),
  setPatioId: (id) => set({ patioId: id }),
  setProfileId: (id) => set({ profileId: id }),
}));

export default useSessionStore;
