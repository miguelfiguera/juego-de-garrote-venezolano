// components/Solicitudes.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Profile } from "@/lib/interfaces/interfaces";
import { accepted, rejected } from "@/lib/firebase/collections/patios";
import { toast } from "react-toastify";

const Solicitudes: React.FC<{ profile: Profile }> = ({ profile }) => {
  const handleReject = async () => {
    try {
      await rejected(profile.userId);
      toast.info("Solicitud rechazada");
    } catch {
      toast.error("Error al rechazar la solicitud");
    }
  };

  const handleAprove = async () => {
    try {
      await accepted(profile.userId);
      toast.info("Solicitud aprobada");
    } catch {
      toast.error("Error al aprobar la solicitud");
    }
  };
  return (
    <div className="card m-3 p-3">
      <div className="card-body">
        {profile.photoUrl ? (
          <Image
            src={profile.photoUrl}
            alt={`Foto de ${profile.name}`}
            width={100}
            height={100}
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white mb-3"
            style={{ width: "100px", height: "100px" }}
          >
            Sin foto
          </div>
        )}

        <h5 className="card-title">{profile.name + " " + profile.lastname}</h5>
        <p className="card-text">
          <strong>Estado de Solicitud:</strong> {profile.patioStatus}
        </p>

        <div className="d-flex justify-content-around">
          <button className="btn btn-success btn-sm" onClick={handleAprove}>
            Aprobar
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleReject}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solicitudes;
