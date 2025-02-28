// components/PublicacionesFull.tsx
"use client";

import React from "react";
import { Publication } from "@/lib/interfaces/interfaces"; // route for interfaces
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import { useRouter } from "next/navigation";

interface PublicacionesFullProps {
  publication: Publication;
}

const PublicacionesFull: React.FC<PublicacionesFullProps> = ({
  publication,
}) => {
  const { customClaims } = useCustomClaimStore(); // Obtiene las custom claims del contexto de autenticación

  const isAdmin = customClaims?.admin === true;

  const router = useRouter();

  const createdAt = `${new Date(
    publication.createdAt as number
  ).toDateString()}`;
  const updatedAt = `${new Date(
    publication.updatedAt as number
  ).toDateString()}`;

  return (
    <div className="container mt-4">
      <h2>Detalles de la Publicación</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{publication.title}</h5>
          {publication.authorName && (
            <p className="card-text">
              <strong>Autor:</strong> {publication.authorName}
            </p>
          )}
          <p className="card-text">
            <strong>Reseña:</strong> {publication.review}
          </p>
          {publication.originalUrl && (
            <p className="card-text">
              <strong>URL Original:</strong>
              <a
                href={publication.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.originalUrl}
              </a>
            </p>
          )}
          {publication.file && (
            <p className="card-text">
              <strong>Archivo:</strong>
              <a
                href={publication.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.file}
              </a>
            </p>
          )}
          <p className="card-text">
            <strong>Creado:</strong> {createdAt}
          </p>
          <p className="card-text">
            <strong>Actualizado:</strong> {updatedAt}
          </p>
          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={() =>
                router.push(`/admin/publicaciones/edit/${publication.id}`)
              }
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicacionesFull;
