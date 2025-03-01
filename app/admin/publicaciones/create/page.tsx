import React from "react";
import CreatePublicationForm from "@/components/publicaciones/CreatePublicationForm";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";

async function Page() {
  const adminId = await getUserIdFromCookie();

  if (!adminId) {
    return (
      <div className="container my-4 py-5">
        <div className="">
          {" "}
          <h1 className="text-center my-5">
            No se puede procesar al administrador, por favor contacte a soporte
            tecnico.
          </h1>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="container my-4 py-5">
      <h1 className="text-center my-4 border-bottom">Agregar Publicacion</h1>
      <CreatePublicationForm adminId={adminId} />
    </div>
  );
}

export default Page;
