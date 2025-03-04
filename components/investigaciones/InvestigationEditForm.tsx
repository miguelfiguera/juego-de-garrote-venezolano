// components/InvestigationEditForm.tsx
"use client";

import React, { useReducer, useEffect } from "react";
import { update } from "@/lib/firebase/collections/investigations"; // Ajusta la ruta
import { Investigation } from "@/lib/interfaces/interfaces"; // Ajusta la ruta
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";

interface FormState {
  investigation: Omit<
    Investigation,
    "createdAt" | "updatedAt" | "investigatorId" | "investigatorName"
  > | null;
  loading: boolean;
  error: string | null;
}

type FormAction =
  | {
      type: "UPDATE_FIELD";
      payload: {
        field: keyof Omit<
          Investigation,
          | "id"
          | "createdAt"
          | "updatedAt"
          | "investigatorId"
          | "investigatorName"
        >;
        value: string;
      };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_INVESTIGATION";
      payload: Omit<
        Investigation,
        "createdAt" | "updatedAt" | "investigatorId" | "investigatorName"
      >;
    };

const initialFormState: FormState = {
  investigation: null,
  loading: false,
  error: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        investigation: state.investigation
          ? {
              ...state.investigation,
              [action.payload.field]: action.payload.value,
            }
          : null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_INVESTIGATION":
      return {
        ...state,
        investigation: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface InvestigationEditFormProps {
  investigationData?: Omit<
    Investigation,
    "createdAt" | "updatedAt" | "investigatorId" | "investigatorName"
  >;
}

const InvestigationEditForm: React.FC<InvestigationEditFormProps> = ({
  investigationData,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const router = useRouter();
  const { customClaims } = useCustomClaimStore();
  useEffect(() => {
    async function nonConditionally() {
      if (investigationData) {
        dispatch({ type: "SET_INVESTIGATION", payload: investigationData });
      }
    }

    nonConditionally();
  }, []);

  const routing = customClaims?.admin
    ? `/admin/investigaciones/${investigationData?.id}`
    : `/investigaciones/${investigationData?.id}`;

  if (!investigationData) {
    return (
      <div className="container my-4">
        <h1 className="text-center my-3 py-3">Investigación no encontrada</h1>
        <div className="container d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/investigaciones`)}
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (
    field: keyof Omit<
      Investigation,
      "id" | "createdAt" | "updatedAt" | "investigatorId" | "investigatorName"
    >,
    value: string
  ) => {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.investigation) {
      toast.error("Datos de la investigación no cargados aún.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Valida los campos aquí (agrega más validaciones según sea necesario)
      if (!state.investigation.title || !state.investigation.review) {
        toast.error("El título y la reseña son obligatorios.");
        return;
      }

      await update(investigationData.id, state.investigation);

      toast.success("Investigación actualizada con éxito!");
      router.push(routing);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al actualizar la investigación", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error al actualizar la investigación",
        });
        toast.error(error.message || "Error al actualizar la investigación");
      } else {
        toast.error("No se pudo actualizar, comunicate con soporte.");
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  if (state.loading) {
    return (
      <div className="container my-4">
        <p>Cargando datos de la investigación...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          Error: {state.error}
        </div>
      </div>
    );
  }

  if (!state.investigation) {
    return (
      <div className="container my-4">
        No hay datos de investigación disponibles.
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Editar Investigación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={state.investigation.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Reseña
          </label>
          <textarea
            className="form-control"
            id="review"
            rows={3}
            value={state.investigation.review}
            onChange={(e) => handleChange("review", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">
            URL Original
          </label>
          <input
            type="url"
            className="form-control"
            id="originalUrl"
            value={state.investigation.originalUrl || ""}
            onChange={(e) => handleChange("originalUrl", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            URL del Archivo
          </label>
          <input
            type="url"
            className="form-control"
            id="file"
            value={state.investigation.file || ""}
            onChange={(e) => handleChange("file", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Estado
          </label>
          <select
            className="form-select"
            id="status"
            value={state.investigation.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value as
                  | "pending"
                  | "payed"
                  | "canceled"
                  | "publication"
                  | "funding"
                  | "complete"
              )
            }
          >
            <option value="pending">Pendiente</option>
            <option value="payed">Pagada</option>
            <option value="canceled">Cancelada</option>
            <option value="publication">Publicación</option>
            <option value="funding">Financiación</option>
            <option value="complete">Completa</option>
          </select>
        </div>

        <div className="container d-flex">
          <button
            type="submit"
            className="btn btn-primary mx-2"
            disabled={state.loading}
          >
            {state.loading ? <>Actualizando...</> : "Actualizar"}
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => router.push(routing)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestigationEditForm;
