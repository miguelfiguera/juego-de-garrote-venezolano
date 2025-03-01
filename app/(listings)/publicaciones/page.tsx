import React from "react";
import { index } from "@/lib/firebase/collections/publications";
import PublicacionesForList from "@/components/publicaciones/PublicacionesForList";

async function Page() {
  const publications = await index();

  if (publications.length === 0) {
    return (
      <div className="container my-4">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">
          Publicaciones
        </h1>
        <div className="">
          {" "}
          <h1 className="text-center my-5">
            No hay publicaciones registradas por ahora.
          </h1>
        </div>{" "}
      </div>
    );
  }

  const mapped = publications.map((publication) => (
    <PublicacionesForList key={publication.id} publication={publication} />
  ));

  return (
    <div className="container">
      <h2 className="text-center fw-bold border-bottom">Publicaciones</h2>
      {mapped}
    </div>
  );
}

export default Page;
