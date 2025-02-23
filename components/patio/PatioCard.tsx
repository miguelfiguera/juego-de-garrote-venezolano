"use client";

import React from "react";
import { Patio } from "@/lib/interfaces/interfaces";

interface PatioCardProps {
  patio: Patio;
}

const PatioCard: React.FC<PatioCardProps> = ({ patio }) => {
  return (
    <div className="container mt-4">
      <h2>Información del Patio</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{patio.name}</h5>
          <p className="card-text">
            <strong>Maestro:</strong> {patio.masterName}
          </p>{" "}
          {/* Display master's name */}
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
            <strong>Correo Electrónico de Contacto:</strong>{" "}
            {patio.contactEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatioCard;
