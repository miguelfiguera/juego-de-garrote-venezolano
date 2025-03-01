import React from "react";
import EditPatioForm from "@/components/patio/EditPatioForm";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";
import { show as showPatio } from "@/lib/firebase/collections/patios";
async function Page({ params }: { params: { id: string } }) {
  const result = await getUserIdFromCookie();
  if (!result) return null;
  const patio = await showPatio(params.id);
  console.log(patio);

  if (!patio) return null;
  const claims = await getUserCustomClaims(result);
  if (!claims) return null;
  if (!claims.admin) {
    return (
      <div className="container">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">
          {" "}
          NO PUEDES EDITAR PORQUE NO ERES ADMIN
        </h1>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Editar Patio</h1>

      <EditPatioForm patio={patio} />
    </div>
  );
}

export default Page;
