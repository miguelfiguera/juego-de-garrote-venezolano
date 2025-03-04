// components/ProfileForAdmin.tsx
"use client";

import React, { useReducer } from "react";
import { Profile, Claims } from "@/lib/interfaces/interfaces"; // Adjust the path
import { toast } from "react-toastify";
import { modifyCustomClaimsAdmin } from "@/lib/firebase/admin/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ProfileForAdminProps {
  profile: Profile;
}

interface State {
  admin: boolean;
  master: boolean;
  blogger: boolean;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_ADMIN"; payload: boolean }
  | { type: "SET_MASTER"; payload: boolean }
  | { type: "SET_BLOGGER"; payload: boolean }
  | { type: "RESET"; payload: null };

const initialState: State = {
  admin: false,
  master: false,
  blogger: false,
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_ADMIN":
      return { ...state, admin: action.payload };
    case "SET_MASTER":
      return { ...state, master: action.payload };
    case "SET_BLOGGER":
      return { ...state, blogger: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};

const ProfileForAdmin: React.FC<ProfileForAdminProps> = ({ profile }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleClaimChange = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    const AddedClaims: Pick<Claims, "admin" | "master" | "blogger"> = {
      admin: state.admin,
      master: state.master,
      blogger: state.blogger,
    };

    try {
      const result = await modifyCustomClaimsAdmin(profile.userId, AddedClaims);

      if (!result) {
        toast.error(
          "Error desconocido al modificar permisos. Contactar a soporte."
        );
        return;
      }
      toast.success("Permisos Actualizados");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating custom claims:", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error al actualizar los roles.",
        });
        toast.error("Error al actualizar los roles.");
      } else {
        toast.error("Error al actualizar los roles.");
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="card my-4 mx-3" style={{ maxWidth: "350px" }}>
      <div className="card-body">
        <h5 className="card-title">Gestionar Roles de Usuario</h5>
        {profile.photoUrl ? (
          <Image
            src={profile.photoUrl}
            alt={`Foto de ${profile.name}`}
            width={100}
            height={100}
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white mb-3"
            style={{ width: "100px", height: "100px" }}
          >
            Sin foto
          </div>
        )}
        <p className="card-text">
          <Link href={`/admin/profiles/${profile.userId}`}>
            <strong>Nombre:</strong> {profile.name} {profile.lastname}
          </Link>
        </p>
        <p className="card-text">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="card-text">
          <strong>Nivel:</strong> {profile.role}
        </p>

        {state.error && <div className="alert alert-danger">{state.error}</div>}

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="adminCheckbox"
            checked={state.admin}
            disabled={state.loading}
            onChange={(e) => {
              dispatch({ type: "SET_ADMIN", payload: e.target.checked });
            }}
          />
          <label className="form-check-label" htmlFor="adminCheckbox">
            Administrador
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="masterCheckbox"
            checked={state.master}
            disabled={state.loading}
            onChange={(e) => {
              dispatch({ type: "SET_MASTER", payload: e.target.checked });
            }}
          />
          <label className="form-check-label" htmlFor="masterCheckbox">
            Maestro
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="bloggerCheckbox"
            checked={state.blogger}
            disabled={state.loading}
            onChange={(e) => {
              dispatch({ type: "SET_BLOGGER", payload: e.target.checked });
            }}
          />
          <label className="form-check-label" htmlFor="bloggerCheckbox">
            Blogger
          </label>
        </div>
      </div>
      <button className="btn btn-primary my-3 mx-3" onClick={handleClaimChange}>
        {state.loading ? (
          <p>Actualizando Permisos...</p>
        ) : (
          <p>Actualizar Permisos</p>
        )}
      </button>
    </div>
  );
};

export default ProfileForAdmin;
