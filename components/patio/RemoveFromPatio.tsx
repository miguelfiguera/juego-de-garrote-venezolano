//This is to handle from the master or admin perspective the members of the patio.

"use client";
import React from "react";
import { leavePatio } from "@/lib/firebase/collections/patios";
import { updateProfileRole } from "@/lib/firebase/collections/profiles";
import { toast } from "react-toastify";

function RemoveFromPatio({ profileId }: { profileId: string }) {
  const handleRemove = async () => {
    try {
      await leavePatio(profileId);
      toast.success("Practicante removido");
    } catch {
      toast.error("Error al remover el practicante");
    }
  };

  const handlePromote = async (
    profileId: string,
    role: "maestro" | "instructor" | "aprendiz"
  ) => {
    if (!role) {
      toast.error("Error al promover el practicante, no hay nivel especifico.");
      return;
    }
    try {
      await updateProfileRole(profileId, { role: role });
      toast.success("Practicante promovido");
    } catch {
      toast.error("Error al promover el practicante");
    }
  };
  return (
    <div className="container d-flex justify-content-center my-3">
      <button className="mx-2 btn btn-danger" onClick={handleRemove}>
        Remover Practicante
      </button>
      <button
        className="mx-2 btn btn-success"
        onClick={() => handlePromote(profileId, "maestro")}
      >
        Asignar Maestro
      </button>
      <button
        className="mx-2 btn btn-primary"
        onClick={() => handlePromote(profileId, "instructor")}
      >
        Asignar Instructor
      </button>
      <button
        className="mx-2 btn btn-warning"
        onClick={() => handlePromote(profileId, "aprendiz")}
      >
        Asignar Aprendiz
      </button>
    </div>
  );
}

export default RemoveFromPatio;
