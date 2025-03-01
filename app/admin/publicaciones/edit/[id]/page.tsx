import React from "react";
import EditPublicationForm from "@/components/publicaciones/EditPublicationForm";
import { show } from "@/lib/firebase/collections/publications";
async function Page({ params }: { params: { id: string } }) {
  const result = await show(params.id);
  if (!result) {
    return (
      <div className="container">
        <h1 className="text-center my-4 py-4">
          {" "}
          No se encontro la publicacion
        </h1>
      </div>
    );
  }
  return (
    <div className="container my-4 py-4">
      <h1 className="text-center my-4 py-4">Editar Publicacion</h1>

      <EditPublicationForm publication={result} />
    </div>
  );
}

export default Page;
