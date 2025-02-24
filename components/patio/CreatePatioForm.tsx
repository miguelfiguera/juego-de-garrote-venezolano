"use client";

import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Patio } from "@/lib/interfaces/interfaces";
import { create } from "@/lib/firebase/collections/patios";
import { toast } from "react-toastify";

// Import firebase things if those are necessary to the context
//import { Timestamp } from "firebase-admin/firestore";

interface CreatePatioFormProps {
  masterId: string; // The masterId is passed as a prop
  masterName: string;
}

interface State {
  photoUrl: string;
  name: string;
  address: string;
  zipCode: string;
  contactPhone: string;
  contactEmail: string;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_PHOTO_URL"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "SET_ZIP_CODE"; payload: string }
  | { type: "SET_CONTACT_PHONE"; payload: string }
  | { type: "SET_CONTACT_EMAIL"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: State = {
  photoUrl: "",
  name: "",
  address: "",
  zipCode: "",
  contactPhone: "",
  contactEmail: "",
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PHOTO_URL":
      return { ...state, photoUrl: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_ZIP_CODE":
      return { ...state, zipCode: action.payload };
    case "SET_CONTACT_PHONE":
      return { ...state, contactPhone: action.payload };
    case "SET_CONTACT_EMAIL":
      return { ...state, contactEmail: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const CreatePatioForm: React.FC<CreatePatioFormProps> = ({
  masterId,
  masterName,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<Patio, "id" | "createdAt" | "updatedAt"> = {
      masterId: masterId,
      masterName: masterName,
      photoUrl: state.photoUrl,
      name: state.name,
      address: state.address,
      zipCode: state.zipCode,
      contactPhone: state.contactPhone,
      contactEmail: state.contactEmail,
    };

    try {
      const result = await create(data);

      if (!result) {
        dispatch({ type: "SET_ERROR", payload: "Error creating patio" });
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      toast.success("¡Patio creado exitosamente!");
      dispatch({ type: "RESET" });
      router.push("/profile");
    } catch (error: unknown) {
      console.error("Error creating patio:", error);
      dispatch({ type: "SET_ERROR", payload: "Error creating patio" });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="container my-4">
      <h2>Crear Patio</h2>
      {state.error && <div className="alert alert-danger">{state.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="masterName" className="form-label">
            Nombre del Maestro:
          </label>
          <input
            type="text"
            className="form-control"
            id="masterName"
            value={masterName}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            URL de la Foto:
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
          <label htmlFor="name" className="form-label">
            Nombre del Patio:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={state.address}
            onChange={(e) =>
              dispatch({ type: "SET_ADDRESS", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">
            Código Postal:
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            value={state.zipCode}
            onChange={(e) =>
              dispatch({ type: "SET_ZIP_CODE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactPhone" className="form-label">
            Teléfono de Contacto:
          </label>
          <input
            type="text"
            className="form-control"
            id="contactPhone"
            value={state.contactPhone}
            onChange={(e) =>
              dispatch({ type: "SET_CONTACT_PHONE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactEmail" className="form-label">
            Correo Electrónico de Contacto:
          </label>
          <input
            type="email"
            className="form-control"
            id="contactEmail"
            value={state.contactEmail}
            onChange={(e) =>
              dispatch({ type: "SET_CONTACT_EMAIL", payload: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loading}
        >
          Crear Patio
        </button>
      </form>
    </div>
  );
};

export default CreatePatioForm;
