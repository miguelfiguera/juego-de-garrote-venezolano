"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser, deleteUser } from "@/lib/firebase/admin/auth";
import useSessionStore from "@/lib/zustand/userDataState";
import { toast } from "react-toastify";

const Page: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();
  const { setUserUid, setSession, userUid } = useSessionStore();
  const handleDeleteClick = async () => {
    if (!confirmDelete) {
      return;
    }
    //logs out user killing the cookie
    await logoutUser();
    if (userUid) {
      await deleteUser(userUid);
    }
    // logs out user on the client killing the state
    setUserUid("");
    setSession(false);

    // notifies the user about closed session
    toast.success("Cuenta Eliminada.");
    //redirects to home
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className="container mt-4 py-5">
      <h2>Eliminar Cuenta</h2>

      {/* Warning Message */}
      <div className="alert alert-warning" role="alert">
        Eliminar la cuenta es un proceso irreversible, tu cuenta será eliminada
        luego de 30 días. Cuentas con 30 días para arrepentirte y puedes
        escribir al equipo a través del correo proyectojuegodegarrote@gmail.com
      </div>

      <p>
        ¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede
        deshacer.
      </p>

      {/* Confirmation Checkbox */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="confirmDelete"
          checked={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="confirmDelete">
          Confirmo que deseo eliminar mi cuenta de forma permanente.
        </label>
      </div>

      {/* Delete Button */}
      <button
        className="btn btn-danger me-2"
        onClick={handleDeleteClick}
        disabled={!confirmDelete}
      >
        Eliminar Cuenta
      </button>

      {/* Cancel Button */}
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancelar
      </button>
    </div>
  );
};

export default Page;
