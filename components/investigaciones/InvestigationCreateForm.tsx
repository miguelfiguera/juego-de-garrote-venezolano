// components/InvestigationForm.tsx
"use client";

import React, { useReducer, useCallback } from "react";
import { create } from "@/lib/firebase/collections/investigations";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";

interface FormState {
  title: string;
  review: string;
  originalUrl: string;
  file: string;
  status:
    | "pending"
    | "payed"
    | "canceled"
    | "complete"
    | "funding"
    | "publication";
  loading: boolean;
  error: string | null;
}

type FormAction =
  | {
      type: "UPDATE_FIELD";
      payload: {
        field: keyof Omit<FormState, "loading" | "error">;
        value: any;
      };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_FORM" };

const initialFormState: FormState = {
  title: "",
  review: "",
  originalUrl: "",
  file: "",
  status: "pending",
  loading: false,
  error: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

interface InvestigationFormProps {
  investigatorId: string;
  investigatorName: string;
}

const InvestigationForm: React.FC<InvestigationFormProps> = ({
  investigatorId,
  investigatorName,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const router = useRouter();
  const { customClaims } = useCustomClaimStore();

  const routing = customClaims?.admin
    ? "/admin/investigaciones"
    : "/investigaciones";

  const handleChange = useCallback(
    (field: keyof Omit<FormState, "loading" | "error">, value: any) => {
      dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
    },
    [dispatch]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Validate inputs here (add more validation as needed)
      if (!state.title || !state.review) {
        throw new Error("Title and Review are required.");
      }

      const newInvestigationId = await create({
        investigatorId: investigatorId,
        investigatorName: investigatorName,
        title: state.title,
        review: state.review,
        originalUrl: state.originalUrl,
        file: state.file,
        status: state.status,
      });

      toast.success("Investigation created successfully!");
      dispatch({ type: "RESET_FORM" }); // Clear the form
      router.push(routing);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to create investigation", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Failed to create investigation",
        });
      } else {
        toast.error("Failed to create investigation, error: UNKNOWN");
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="container m-4">
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titulo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={state.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Descripcion
          </label>
          <textarea
            className="form-control"
            id="review"
            rows={3}
            value={state.review}
            onChange={(e) => handleChange("review", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">
            URL Original (si aplica)
          </label>
          <input
            type="url"
            className="form-control"
            id="originalUrl"
            value={state.originalUrl}
            onChange={(e) => handleChange("originalUrl", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            URL del archivo (si aplica)
          </label>
          <input
            type="url"
            className="form-control"
            id="file"
            value={state.file}
            onChange={(e) => handleChange("file", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            value={state.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value as
                  | "pending"
                  | "payed"
                  | "canceled"
                  | "error"
                  | "funding"
              )
            }
          >
            <option value="pending">Pendiente</option>
            <option value="payed">Financiamiento conseguido</option>
            <option value="canceled">Cancelada</option>
            <option value="funding">En proceso de financiamiento</option>
            <option value="publication">Publicada</option>
            <option value="complete">Completada</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loading}
        >
          {state.loading ? <>Creando...</> : "Crear"}
        </button>

        <button
          className="btn btn-secundary"
          onClick={() => router.push(routing)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default InvestigationForm;
