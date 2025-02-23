"use client";

import React from "react";
import Image from "next/image";
import { Patio } from "@/lib/interfaces/interfaces";

interface PatioCardProps {
  patio: Patio;
}

const PatioCard: React.FC<PatioCardProps> = ({ patio }) => {
  return (
    <div className="card h-100">
      {patio.photoUrl ? (
        <Image
          src={patio.photoUrl}
          alt="Foto del Patio"
          className="card-img-top"
          width={400} // Adjust the width and height as needed
          height={200}
          style={{ objectFit: "cover", height: "200px", width: "100%" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-secondary text-white"
          style={{ height: "200px" }}
        >
          Sin Foto
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{patio.name}</h5>
        <p className="card-text">
          <strong>Maestro:</strong> {patio.masterName}
        </p>
        <p className="card-text">
          <strong>Dirección:</strong> {patio.address}
        </p>
        <p className="card-text">
          <strong>Código Postal:</strong> {patio.zipCode}
        </p>
        <p className="card-text">
          <strong>Teléfono de Contacto:</strong> {patio.contactPhone}
        </p>
        <p className="card-text">
          <strong>Correo Electrónico de Contacto:</strong> {patio.contactEmail}
        </p>
      </div>
    </div>
  );
};

export default PatioCard;
