import React from "react";
import { show } from "@/lib/firebase/collections/publications";
import PublicacionesFull from "@/components/publicaciones/PublicacionesFull";

async function Page({ params }: any) {
  const result = await show(params.id);
  if (!result)
    return (
      <div className="container">
        <h1 className="text-center my-4 py-4">
          {" "}
          No se encontro la publicacion
        </h1>
      </div>
    );

  return (
    <div className="container">
      <PublicacionesFull publication={result} />
    </div>
  );
}

export default Page;
