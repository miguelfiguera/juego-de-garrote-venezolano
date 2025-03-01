// lib/zustand/profileState.ts
import { create } from "zustand";
import { Profile } from "@/lib/interfaces/interfaces"; // Adjust the path if necessary

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

export default useProfileStore;
