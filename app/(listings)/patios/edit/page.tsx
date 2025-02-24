import React from "react";
import EditPatioForm from "@/components/patio/EditPatioForm";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";
import { show as showPatio } from "@/lib/firebase/collections/patios";
async function Page() {
  const result = await getUserIdFromCookie();
  if (!result) return null;
  const profile = await show(result);
  if (!profile) return null;
  if (!profile.patioId) return null;
  const patio = await showPatio(profile.patioId);
  if (!patio) return null;
  const claims = await getUserCustomClaims(result);
  if (!claims) return null;
  if (!claims.master) {
    return (
      <div className="container">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">
          {" "}
          NO PUEDES EDITAR PORQUE NO ERES EL MAESTRO DE ESTE Patio
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
