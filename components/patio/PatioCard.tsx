"use client";

import React from "react";
import Image from "next/image";
import { Patio } from "@/lib/interfaces/interfaces";
import useSessionStore from "@/lib/zustand/userDataState";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import { useRouter } from "next/navigation";
import { destroy as destroyPatio } from "@/lib/firebase/collections/patios";
interface PatioCardProps {
  patio: Patio;
}

const PatioCard: React.FC<PatioCardProps> = ({ patio }) => {
  const { userUid } = useSessionStore();
  const { customClaims } = useCustomClaimStore();
  const router = useRouter();
  const handleDestroy = async () => {
    await destroyPatio(patio.id);
  };
  return (
    <div className="card h-100 my-4 mx-auto" style={{ width: "75%" }}>
      {patio.photoUrl ? (
        <Image
          src={patio.photoUrl}
          alt="Foto del Patio"
          className="card-img-top mt-3"
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
        <h5 className="card-title fw-bold">{patio.name}</h5>
        <p className="card-text">
          <strong>Maestro:</strong> {patio.masterName}
        </p>
        <p className="card-text">
          <strong>Dirección:</strong> {patio.address}
        </p>
        <p className="card-text">
          <strong>Estado:</strong> {patio.state}
        </p>
        <p className="card-text">
          <strong>Pais:</strong> {patio.country}
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

        {customClaims?.master && patio.masterId === userUid && (
          <div className="container my-2">
            <button
              className="btn btn-primary mx-2"
              onClick={() => router.push(`/patios/edit`)}
            >
              Editar
            </button>
            <button className="btn btn-warning mx-2" onClick={handleDestroy}>
              Borrar Patio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatioCard;
