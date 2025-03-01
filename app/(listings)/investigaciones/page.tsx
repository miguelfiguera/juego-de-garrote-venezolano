import React from "react";
import { index } from "@/lib/firebase/collections/investigations";
import InvestigationForList from "@/components/investigaciones/InvestigacionForList";
import Link from "next/link";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";

async function Page() {
  const investigations = await index();

  const investigationCards = investigations.map((investigation) => (
    <InvestigationForList
      key={investigation.id}
      investigation={investigation}
    />
  ));

  let userClaims = null;
  const userId = await getUserIdFromCookie();
  if (userId) {
    userClaims = await getUserCustomClaims(userId);
  }

  const willShow = userClaims?.investigator || userClaims?.admin;

  const routing = userClaims?.admin
    ? `/admin/investigaciones/create`
    : `/investigaciones/create`;

  //const display =
  if (investigations.length === 0) {
    return (
      <div className="container my-4">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">
          Investigaciones
        </h1>
        <div className="">
          {" "}
          <h1 className="text-center my-5">
            No hay investigaciones registradas por ahora.
          </h1>
        </div>{" "}
        {userId != null && (
          <div className="container d-flex flex-row justify-content-center">
            <Link href={routing}>
              <button className="btn btn-primary mx-auto">
                Agregar investigacion
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold border-bottom">Investigaciones</h2>
      <div className="container d-flex flex-row justify-content-center">
        {willShow && (
          <Link href={routing}>
            <button className="btn btn-primary mx-auto">
              Agregar investigacion
            </button>
          </Link>
        )}
      </div>
      {investigationCards}
    </div>
  );
}

export default Page;
