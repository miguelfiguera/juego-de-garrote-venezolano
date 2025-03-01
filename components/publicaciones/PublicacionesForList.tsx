// components/PublicacionesForList.tsx
"use client";

import React from "react";
import { Publication } from "@/lib/interfaces/interfaces"; // route for interfaces
import Link from "next/link";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";

interface PublicacionesForListProps {
  publication: Publication;
}

const PublicacionesForList: React.FC<PublicacionesForListProps> = ({
  publication,
}) => {
  const { customClaims } = useCustomClaimStore(); // Obtiene las custom claims del contexto de autenticación

  const isAdmin = customClaims?.admin === true;

  const routing = isAdmin
    ? `/admin/publicaciones/${publication.id}`
    : `/publicaciones/${publication.id}`;
  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <Link href={routing}>
            {" "}
            <h5 className="card-title">{publication.title}</h5>
          </Link>
          {publication.authorName && (
            <p className="card-text">
              <strong>Autor: </strong> {publication.authorName}
            </p>
          )}

          {publication.originalUrl && (
            <p className="card-text">
              <strong>URL Original: </strong>
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
              <strong>Archivo: </strong>
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
