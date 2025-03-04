// components/InvestigacionFull.tsx
"use client";

import React from "react";
import { Investigation } from "@/lib/interfaces/interfaces"; // Adjust the path
import { toast } from "react-toastify";
import { destroy } from "@/lib/firebase/collections/investigations";
import { useRouter } from "next/navigation";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import useSessionStore from "@/lib/zustand/userDataState";
//import Link from "next/link";

interface InvestigacionFullProps {
  investigation: Investigation;
}

const InvestigacionFull: React.FC<InvestigacionFullProps> = ({
  investigation,
}) => {
  const router = useRouter();
  const { customClaims } = useCustomClaimStore();
  const { userUid } = useSessionStore();

  const createdAt = `${new Date(
    investigation.createdAt as number
  ).toDateString()}`;
  const updatedAt = `${new Date(
    investigation.updatedAt as number
  ).toDateString()}`;

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this investigation? This action cannot be undone."
      )
    ) {
      return; // User cancelled the deletion
    }

    try {
      await destroy(investigation.id);
      toast.success("Investigation deleted successfully!");
      if (customClaims?.admin) {
        router.push("/admin/investigaciones"); // Redirect to the investigations list after successful deletion
      } else {
        router.push("/investigaciones"); // Redirect to the investigations list after successful deletion
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to delete investigation:", error.message);
        toast.error(error.message || "Failed to delete investigation");
      }
      console.error("Failed to delete investigation", error);
      toast.error("Failed to delete investigation");
    }
  };

  const showing =
    userUid === investigation.investigatorId || customClaims?.admin;

  const editRoute = customClaims?.admin
    ? `/admin/investigaciones/edit/${investigation.id}`
    : `/investigaciones/edit/${investigation.id}`;

  const backRoute = customClaims?.admin
    ? `/admin/investigaciones`
    : `/investigaciones`;
  return (
    <div className="container m-4">
      <h2>Datos de la investigacion</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <strong>Titulo:</strong> {investigation.title}
          </h5>
          <p className="card-text">
            <strong>ID de la investigacion:</strong> {investigation.id}
          </p>

          <p className="card-text">
            <strong>Nombre del Investigador:</strong>{" "}
            {investigation.investigatorName}
          </p>
          <p className="card-text">
            <strong>Descripcion:</strong> {investigation.review}
          </p>
          {investigation.originalUrl && (
            <p className="card-text">
              <strong>URL Original:</strong>{" "}
              <a
                href={investigation.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {investigation.originalUrl}
              </a>
            </p>
          )}
          {investigation.file && (
            <p className="card-text">
              <strong>URL del archivo:</strong>{" "}
              <a
                href={investigation.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                {investigation.file}
              </a>
            </p>
          )}
          <p className="card-text">
            <strong>Estatus:</strong> {investigation.status}
          </p>
          <p className="card-text">
            <strong>Creado: {createdAt}</strong>{" "}
          </p>
          <p className="card-text">
            <strong>Modificado: {updatedAt}</strong>{" "}
          </p>
          {showing && (
            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => router.push(editRoute)}
              >
                Editar
              </button>
              <button className="btn btn-danger me-2" onClick={handleDelete}>
                Borrar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => router.push(backRoute)}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestigacionFull;
