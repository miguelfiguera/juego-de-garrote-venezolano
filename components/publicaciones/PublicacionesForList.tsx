// components/PublicacionesForList.tsx
"use client";

import React from "react";
import { Publication } from "@/lib/interfaces/interfaces"; // route for interfaces
import { useRouter } from "next/navigation";

interface PublicacionesForListProps {
  publication: Publication;
}

const PublicacionesForList: React.FC<PublicacionesForListProps> = ({
  publication,
}) => {
  const router = useRouter();

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
        </div>
      </div>
    </div>
  );
};

export default PublicacionesForList;
