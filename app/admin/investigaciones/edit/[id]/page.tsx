import React from "react";
import InvestigationEditForm from "@/components/investigaciones/InvestigationEditForm";
import { show } from "@/lib/firebase/collections/investigations";

async function Page({ params }: any) {
  const result = await show(params.id);
  if (!result) {
    return (
      <div className="container">
        <h1 className="text-center my-4 py-4">
          {" "}
          No se encontro la investigacion
        </h1>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="text-center">Editar Investigacion</h2>
      <InvestigationEditForm investigationData={result} />
    </div>
  );
}

export default Page;
