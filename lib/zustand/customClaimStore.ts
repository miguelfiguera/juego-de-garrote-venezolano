import { create } from "zustand";
import { Claims } from "@/lib/interfaces/interfaces";

interface CustomClaimState {
  customClaims: Claims | null;
  setCustomClaims: (claims: Claims) => void;
  resetCustomClaims: () => void;
}

const useCustomClaimStore = create<CustomClaimState>((set) => ({
  customClaims: null,
  setCustomClaims: (claims: Claims) => set({ customClaims: claims }),
  resetCustomClaims: () => set({ customClaims: null }),
}));

export default useCustomClaimStore;
