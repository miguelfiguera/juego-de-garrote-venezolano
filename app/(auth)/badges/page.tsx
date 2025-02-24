// components/Page.tsx
"use client";

import React, { useReducer, useCallback } from "react";
import { toast } from "react-toastify";
import useSessionStore from "@/lib/zustand/userDataState";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import { modifyCustomClaims } from "@/lib/firebase/admin/auth";
import { Claims } from "@/lib/interfaces/interfaces";
import { useRouter } from "next/navigation";
// Using Font Awesome via CDN, so no direct import here

interface State {
  claims: Pick<Claims, "blogger" | "seller" | "investigator" | "jugador">;
  loading: boolean;
}

type Action =
  | {
      type: "TOGGLE_CLAIM";
      payload: keyof Pick<
        Claims,
        "blogger" | "seller" | "investigator" | "jugador"
      >;
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET_CLAIMS" };

const initialState: State = {
  claims: {
    blogger: false,
    seller: false,
    investigator: false,
    jugador: false,
  },
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_CLAIM":
      return {
        ...state,
        claims: {
          ...state.claims,
          [action.payload]: !state.claims[action.payload],
        },
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "RESET_CLAIMS":
      return {
        ...state,
        claims: {
          blogger: false,
          seller: false,
          investigator: false,
          jugador: false,
        },
      };
    default:
      return state;
  }
};

const Page: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userUid } = useSessionStore();
  const { customClaims } = useCustomClaimStore();
  const router = useRouter();
  const handleChange = useCallback(
    (
      claimName: keyof Pick<
        Claims,
        "blogger" | "seller" | "investigator" | "jugador"
      >
    ) => {
      dispatch({ type: "TOGGLE_CLAIM", payload: claimName });
    },
    [dispatch]
  );

  const handleSubmit = async () => {
    if (!userUid) {
      toast.error("User ID is missing.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    if (!customClaims?.master || !customClaims?.admin) {
      toast.error("No Permissions detected. Contact Administrator.");
      return;
    }

    const newClaims: Claims = {
      master: customClaims.master,
      admin: customClaims.admin,
      blogger: customClaims.blogger,
      seller: state.claims.seller,
      investigator: state.claims.investigator,
      jugador: state.claims.jugador,
    };

    try {
      const result = await modifyCustomClaims(userUid, newClaims);
      if (!result) {
        dispatch({ type: "SET_LOADING", payload: false });
        throw new Error("Error updating claims");
      }
      toast.success("Permisos Actualizados");
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating claims:", error);
        toast.error(`An unexpected error occurred: ${error.message}`, {
          // Using Font Awesome class directly
          icon: <i className="fas fa-times"></i>,
        });
      } else {
        console.error("Error updating claims:", error);
        toast.error("An unexpected error occurred", {
          // Using Font Awesome class directly
          icon: <i className="fas fa-times"></i>,
        });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div
      className="container my-4 border rounded-3 mx-auto p-4"
      style={{ maxWidth: "500px" }}
    >
      <h3 className="border-bottom">Editar Permisos</h3>
      <div className="mb-3">
        <label className="form-check-label">
          Blogger:
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={state.claims.blogger}
            onChange={() => handleChange("blogger")}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-check-label">
          Seller:
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={state.claims.seller}
            onChange={() => handleChange("seller")}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-check-label">
          Investigator:
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={state.claims.investigator}
            onChange={() => handleChange("investigator")}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-check-label">
          Jugador:
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={state.claims.jugador}
            onChange={() => handleChange("jugador")}
          />
        </label>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={state.loading}
      >
        {state.loading ? (
          <>
            <i className="fas fa-spinner fa-spin me-2"></i>
            Updating...
          </>
        ) : (
          "Update Claims"
        )}
      </button>
    </div>
  );
};

export default Page;
