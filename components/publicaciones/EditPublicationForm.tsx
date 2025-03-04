// components/EditPublicationForm.tsx
"use client";

import React, { useReducer, useCallback } from "react";
import { update } from "@/lib/firebase/collections/publications"; // Changed import to 'update'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Publication } from "@/lib/interfaces/interfaces";

interface FormState {
  title: string;
  review: string;
  authorName: string;
  originalUrl: string;
  file: string;
  loading: boolean;
  error: string | null;
}

type FormAction =
  | { type: "UPDATE_FIELD"; payload: { field: keyof FormState; value: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PUBLICATION"; payload: Publication };

const initialFormState: FormState = {
  title: "",
  review: "",
  authorName: "",
  originalUrl: "",
  file: "",
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
    case "SET_PUBLICATION":
      return {
        ...state,
        title: action.payload.title,
        review: action.payload.review,
        authorName: action.payload.authorName || "",
        originalUrl: action.payload.originalUrl || "",
        file: action.payload.file || "",
      };
    default:
      return state;
  }
};

interface EditPublicationFormProps {
  publication: Publication;
}

const EditPublicationForm: React.FC<EditPublicationFormProps> = ({
  publication,
}) => {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialFormState,
    title: publication.title,
    review: publication.review,
    authorName: publication.authorName || "",
    originalUrl: publication.originalUrl || "",
    file: publication.file || "",
  });
  const router = useRouter();

  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
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
        throw new Error("El título y la reseña son obligatorios.");
      }

      await update(publication.id, {
        adminId: publication.adminId,
        title: state.title,
        review: state.review,
        authorName: state.authorName,
        originalUrl: state.originalUrl,
        file: state.file,
      });

      toast.success("¡Publicación actualizada con éxito!");
      router.push("/admin/publicaciones");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al actualizar la publicación", error);
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error al actualizar la publicación.",
        });
        toast.error(error.message || "Error al actualizar la publicación");
      } else {
        console.error("Error al actualizar la publicación", error);
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="container my-4">
      <h2>Editar Publicación</h2>
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
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
            Reseña
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
          <label htmlFor="authorName" className="form-label">
            Nombre del Autor
          </label>
          <input
            type="text"
            className="form-control"
            id="authorName"
            value={state.authorName}
            onChange={(e) => handleChange("authorName", e.target.value)}
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
            value={state.originalUrl}
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
            value={state.file}
            onChange={(e) => handleChange("file", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loading}
        >
          {state.loading ? "Actualizando..." : "Actualizar"}
        </button>

        <button
          className="btn btn-secondary mx-2"
          onClick={() => router.push("/admin/publicaciones")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditPublicationForm;
