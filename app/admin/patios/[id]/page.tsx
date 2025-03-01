import React from "react";
import PatioCard from "@/components/patio/PatioCard";
import { show } from "@/lib/firebase/collections/patios";
import { getProfilesByPatioId } from "@/lib/firebase/collections/profiles";
import PatioProfileCard from "@/components/patio/PatioProfileCard";
import Solicitudes from "@/components/patio/Solicitudes";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";

async function Page({ params }: { params: { id: string } }) {
  const userUid = await getUserIdFromCookie();
  if (!userUid) return null;
  const patio = await show(params.id);
  const jugadores = await getProfilesByPatioId(params.id);

  const aprendicesCards = jugadores
    .filter((jugador) => jugador.role == "aprendiz")
    .map((jugador) => (
      <PatioProfileCard
        key={jugador.id}
        profile={jugador}
        patioId={params.id}
      />
    ));

  const instructoresCards = jugadores
    .filter((jugador) => jugador.role == "instructor")
    .map((jugador) => (
      <PatioProfileCard
        key={jugador.id}
        profile={jugador}
        patioId={params.id}
      />
    ));

  const maestrosCards = jugadores
    .filter((jugador) => jugador.role == "maestro")
    .map((jugador) => (
      <PatioProfileCard
        key={jugador.id}
        profile={jugador}
        patioId={params.id}
      />
    ));

  const newCommers = jugadores
    .filter((jugador) => jugador.patioStatus == "pending")
    .map((jugador) => <Solicitudes key={jugador.id} profile={jugador} />);

  if (!patio) {
    return (
      <div className="container my-4">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Patios</h1>
        <div className="">
          {" "}
          <h1 className="text-center my-5">
            No hay patios registrados por ahora.
          </h1>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
        Patio
      </h1>
      <div className="row">{<PatioCard patio={patio} />}</div>
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
        Practicantes del Patio
      </h1>
      {maestrosCards.length > 0 && (
        <div className="container">
          <h2 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
            Maestros
          </h2>
          <div className="row">{maestrosCards}</div>
        </div>
      )}
      {instructoresCards.length > 0 && (
        <div className="container">
          <h2 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
            Instructores
          </h2>
          <div className="row">{instructoresCards}</div>
        </div>
      )}

      {aprendicesCards.length > 0 && (
        <div className="container">
          <h2 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
            Aprendices
          </h2>
          <div className="row">{aprendicesCards}</div>
        </div>
      )}
      {newCommers.length > 0 && userUid == patio.masterId && (
        <div className="container">
          <h2 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
            Solicitudes
          </h2>
          <div className="row">{newCommers}</div>
        </div>
      )}
    </div>
  );
}

export default Page;
