"use client";

import React, { useReducer, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { update } from "@/lib/firebase/collections/profiles";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
}

interface EditProfileFormProps {
  profile: Profile;
}

interface State {
  name: string;
  lastname: string;
  address: string;
  age: number;
  status: string;
  role: "aprendiz" | "instructor" | "maestro";
  yearsInTheGame: number;
  biography: string;
  zipcode: string;
  phone: string;
  email: string;
  style: string;
  nationalIdNumber: string;
  photoUrl: string;
  country: string;
}

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_LASTNAME"; payload: string }
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "SET_AGE"; payload: number }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_ROLE"; payload: "aprendiz" | "instructor" | "maestro" }
  | { type: "SET_YEARS_IN_THE_GAME"; payload: number }
  | { type: "SET_BIOGRAPHY"; payload: string }
  | { type: "SET_ZIPCODE"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_STYLE"; payload: string }
  | { type: "SET_NATIONAL_ID_NUMBER"; payload: string }
  | { type: "SET_PHOTO_URL"; payload: string }
  | { type: "SET_COUNTRY"; payload: string };

const initialState: State = {
  name: "",
  lastname: "",
  address: "",
  age: 0,
  status: "",
  role: "aprendiz",
  yearsInTheGame: 0,
  biography: "",
  zipcode: "",
  phone: "",
  email: "",
  style: "",
  nationalIdNumber: "",
  photoUrl: "",
  country: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_LASTNAME":
      return { ...state, lastname: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_AGE":
      return { ...state, age: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_YEARS_IN_THE_GAME":
      return { ...state, yearsInTheGame: action.payload };
    case "SET_BIOGRAPHY":
      return { ...state, biography: action.payload };
    case "SET_ZIPCODE":
      return { ...state, zipcode: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_STYLE":
      return { ...state, style: action.payload };
    case "SET_NATIONAL_ID_NUMBER":
      return { ...state, nationalIdNumber: action.payload };
    case "SET_PHOTO_URL":
      return { ...state, photoUrl: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    default:
      return state;
  }
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({ profile }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  //This useEffect is to set the initial state with the profile data
  // so it gets shown on the profile/edit route.
  useEffect(() => {
    dispatch({ type: "SET_NAME", payload: profile.name || "" });
    dispatch({ type: "SET_LASTNAME", payload: profile.lastname || "" });
    dispatch({ type: "SET_ADDRESS", payload: profile.address || "" });
    dispatch({ type: "SET_AGE", payload: profile.age || 0 });
    dispatch({ type: "SET_STATUS", payload: profile.status || "" });
    dispatch({ type: "SET_ROLE", payload: profile.role || "aprendiz" });
    dispatch({
      type: "SET_YEARS_IN_THE_GAME",
      payload: profile.yearsInTheGame || 0,
    });
    dispatch({ type: "SET_BIOGRAPHY", payload: profile.biography || "" });
    dispatch({ type: "SET_ZIPCODE", payload: profile.zipcode || "" });
    dispatch({ type: "SET_PHONE", payload: profile.phone || "" });
    dispatch({ type: "SET_EMAIL", payload: profile.email || "" });
    dispatch({ type: "SET_STYLE", payload: profile.style || "" });
    dispatch({
      type: "SET_NATIONAL_ID_NUMBER",
      payload: profile.nationalIdNumber || "",
    });
    dispatch({
      type: "SET_PHOTO_URL",
      payload: profile.photoUrl || "",
    });
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: Profile = {
      ...profile,
      name: state.name,
      lastname: state.lastname,
      address: state.address,
      age: state.age,
      status: state.status,
      role: state.role,
      yearsInTheGame: state.yearsInTheGame,
      biography: state.biography,
      zipcode: state.zipcode,
      phone: state.phone,
      email: state.email,
      style: state.style,
      nationalIdNumber: state.nationalIdNumber,
      photoUrl: state.photoUrl,
      country: state.country,
    };

    update(profile.id, updatedProfile);
    toast.success("Perfil actualizado correctamente");
    router.push("/profile");
  };
  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className="container mt-4 py-4">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido:
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={state.lastname}
            onChange={(e) =>
              dispatch({ type: "SET_LASTNAME", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={state.address}
            onChange={(e) =>
              dispatch({ type: "SET_ADDRESS", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edad" className="form-label">
            Edad:
          </label>
          <input
            type="number"
            className="form-control"
            id="edad"
            value={state.age}
            onChange={(e) =>
              dispatch({
                type: "SET_AGE",
                payload: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
          <input
            type="text"
            className="form-control"
            id="estado"
            value={state.status}
            onChange={(e) =>
              dispatch({ type: "SET_STATUS", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol:
          </label>
          <select
            className="form-select"
            id="rol"
            value={state.role}
            onChange={(e) =>
              dispatch({
                type: "SET_ROLE",
                payload: e.target.value as
                  | "aprendiz"
                  | "instructor"
                  | "maestro",
              })
            }
          >
            <option value="aprendiz">Aprendiz</option>
            <option value="instructor">Instructor</option>
            <option value="maestro">Maestro</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="anhosEnElJuego" className="form-label">
            Años en el Juego:
          </label>
          <input
            type="number"
            className="form-control"
            id="anhosEnElJuego"
            value={state.yearsInTheGame}
            onChange={(e) =>
              dispatch({
                type: "SET_YEARS_IN_THE_GAME",
                payload: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="biografia" className="form-label">
            Biografía:
          </label>
          <textarea
            className="form-control"
            id="biografia"
            value={state.biography}
            onChange={(e) =>
              dispatch({ type: "SET_BIOGRAPHY", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="codigoPostal" className="form-label">
            Código Postal:
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoPostal"
            value={state.zipcode}
            onChange={(e) =>
              dispatch({ type: "SET_ZIPCODE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono:
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={state.phone}
            onChange={(e) =>
              dispatch({ type: "SET_PHONE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            className="form-control"
            id="correoElectronico"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estilo" className="form-label">
            Estilo de Juego de Garrote (N/A si no aplica):
          </label>
          <input
            type="text"
            className="form-control"
            id="estilo"
            value={state.style}
            onChange={(e) =>
              dispatch({ type: "SET_STYLE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="numeroDeIdentificacionNacional"
            className="form-label"
          >
            Número de Identificación Nacional:
          </label>
          <input
            type="text"
            className="form-control"
            id="numeroDeIdentificacionNacional"
            value={state.nationalIdNumber}
            onChange={(e) =>
              dispatch({
                type: "SET_NATIONAL_ID_NUMBER",
                payload: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            URL de la foto de perfil:
          </label>
          <input
            type="text"
            className="form-control"
            id="photoUrl"
            value={state.photoUrl}
            onChange={(e) =>
              dispatch({ type: "SET_PHOTO_URL", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={state.country}
            onChange={(e) =>
              dispatch({ type: "SET_COUNTRY", payload: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary me-2"
          onClick={handleSubmit}
        >
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
