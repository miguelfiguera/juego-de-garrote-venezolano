"use client";

import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Patio } from "@/lib/interfaces/interfaces";
import { update } from "@/lib/firebase/collections/patios";
import { toast } from "react-toastify";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";

//import { Timestamp } from "firebase-admin/firestore";

interface EditPatioFormProps {
  patio: Patio;
}

interface State {
  masterName: string;
  photoUrl: string;
  name: string;
  address: string;
  zipCode: string;
  contactPhone: string;
  contactEmail: string;
  loading: boolean;
  error: string | null;
  state: string;
  country: string;
}

type Action =
  | { type: "SET_MASTER_NAME"; payload: string }
  | { type: "SET_PHOTO_URL"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "SET_ZIP_CODE"; payload: string }
  | { type: "SET_CONTACT_PHONE"; payload: string }
  | { type: "SET_CONTACT_EMAIL"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_STATE"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  masterName: "",
  photoUrl: "",
  name: "",
  address: "",
  zipCode: "",
  contactPhone: "",
  contactEmail: "",
  loading: false,
  error: null,
  state: "",
  country: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MASTER_NAME":
      return { ...state, masterName: action.payload };
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
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const EditPatioForm: React.FC<EditPatioFormProps> = ({ patio }) => {
  const [state, dispatch] = useReducer(reducer, {
    masterName: patio.masterName,
    photoUrl: patio.photoUrl,
    name: patio.name,
    address: patio.address,
    zipCode: patio.zipCode,
    contactPhone: patio.contactPhone,
    contactEmail: patio.contactEmail,
    loading: false,
    error: null,
    state: patio.state,
    country: patio.country,
  });
  const router = useRouter();
  const { customClaims } = useCustomClaimStore();
  const routing = customClaims?.admin
    ? `/admin/patios/${patio.id}`
    : `/profiles`;

  // No need for useEffect anymore. Using a new instance of the state.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data for saving, excluding masterId, id, createdAt, and updatedAt
    const updatedPatioData: Omit<Patio, "id" | "createdAt" | "updatedAt"> = {
      masterId: patio.masterId,
      masterName: state.masterName,
      photoUrl: state.photoUrl,
      state: state.state, // Changed patio.state to state.state
      country: state.country, // Changed patio.country to state.country
      name: state.name,
      address: state.address,
      zipCode: state.zipCode,
      contactPhone: state.contactPhone,
      contactEmail: state.contactEmail,
    };

    try {
      await update(patio.id, updatedPatioData);
      toast.success("¡Patio actualizado exitosamente!");
      dispatch({ type: "RESET" });
      router.push(routing);
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Error updating patio" });
    }
  };

  const handleCancel = () => {
    router.push(routing);
  };

  return (
    <div className="container mt-4 py-5">
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
            value={state.masterName}
            readOnly
            onChange={(e) =>
              dispatch({ type: "SET_MASTER_NAME", payload: e.target.value })
            }
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
          <label htmlFor="state" className="form-label">
            Estado:
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={state.state} // The value was missing here, so I added
            onChange={(e) =>
              dispatch({ type: "SET_STATE", payload: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Pais:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={state.country} // The value was missing here, so I added
            onChange={(e) =>
              dispatch({ type: "SET_COUNTRY", payload: e.target.value })
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

        <button type="submit" className="btn btn-primary me-2">
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

export default EditPatioForm;
