"use client";

import React from "react";
import Image from "next/image";
import { Patio } from "@/lib/interfaces/interfaces";
import useSessionStore from "@/lib/zustand/userDataState";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import { useRouter } from "next/navigation";
import {
  destroy as destroyPatio,
  joinPatio,
  leavePatio,
} from "@/lib/firebase/collections/patios";
import { toast } from "react-toastify";
import Link from "next/link";
interface PatioCardProps {
  patio: Patio;
}

const PatioCard: React.FC<PatioCardProps> = ({ patio }) => {
  const { userUid, patioId, session } = useSessionStore();
  const { customClaims } = useCustomClaimStore();
  const router = useRouter();
  const routing = customClaims?.admin
    ? `/admin/patios/edit/${patio.id}`
    : `/patios/edit/`;
  const adminVersion = customClaims?.admin
    ? `/admin/patios/${patio.id}`
    : `/patios/${patio.id}`;
  const handleDestroy = async () => {
    await destroyPatio(patio.id);
  };

  const handleJoin = async () => {
    if (!userUid) {
      toast.error("No se encuentra el id de usuario.");

      return;
    }
    await joinPatio(patio.id, userUid);
    toast.success("Has solicitado unirte al patio, solicitud pendiente");
    router.refresh();
  };
  const handleLeave = async () => {
    if (!userUid) {
      toast.error("No se encuentra el id de usuario.");
      return;
    }
    await leavePatio(userUid);
    toast.success("Has dejado el patio");
    router.refresh();
  };
  const willShow = customClaims?.admin;
  const isMaster = patio.masterId === userUid;
  const canEdit = willShow || isMaster;

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
        <Link href={adminVersion}>
          <h5 className="card-title fw-bold">{patio.name}</h5>
        </Link>
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

        <div className="container my-2">
          {canEdit && (
            <button
              className="btn btn-primary mx-2"
              onClick={() => router.push(routing)}
            >
              Editar
            </button>
          )}
          {canEdit && (
            <button className="btn btn-warning mx-2" onClick={handleDestroy}>
              Borrar Patio
            </button>
          )}

          {!patioId && session && (
            <button className="btn btn-success mx-2" onClick={handleJoin}>
              Unirse al Patio
            </button>
          )}

          {patioId == patio.id && (
            <button className="btn btn-danger mx-2" onClick={handleLeave}>
              Salir del Patio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatioCard;
